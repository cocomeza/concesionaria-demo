-- ============================================
-- SCHEMA DE BASE DE DATOS PARA CONCESIONARIA
-- ============================================

-- Extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLA: vehicles
-- ============================================
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  marca TEXT NOT NULL,
  modelo TEXT NOT NULL,
  año INTEGER NOT NULL CHECK (año >= 1900 AND año <= EXTRACT(YEAR FROM NOW()) + 1),
  precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
  precio_anterior DECIMAL(10,2) CHECK (precio_anterior >= 0),
  kilometraje INTEGER CHECK (kilometraje >= 0),
  combustible TEXT CHECK (combustible IN ('nafta', 'diesel', 'electrico', 'hibrido')),
  transmision TEXT CHECK (transmision IN ('manual', 'automatica')),
  carroceria TEXT CHECK (carroceria IN ('sedan', 'suv', 'pickup', 'coupe', 'hatchback')),
  color TEXT,
  puertas INTEGER CHECK (puertas > 0 AND puertas <= 6),
  descripcion TEXT,
  caracteristicas JSONB DEFAULT '[]'::jsonb,
  imagenes TEXT[] DEFAULT '{}',
  imagen_principal TEXT,
  estado TEXT CHECK (estado IN ('disponible', 'reservado', 'vendido')) DEFAULT 'disponible',
  destacado BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0 CHECK (views >= 0),
  patente TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================
-- TABLA: pedidos
-- ============================================
CREATE TABLE IF NOT EXISTS pedidos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  cliente_nombre TEXT NOT NULL,
  cliente_email TEXT NOT NULL,
  cliente_telefono TEXT NOT NULL,
  mensaje TEXT,
  tipo TEXT CHECK (tipo IN ('consulta', 'test_drive', 'compra')) DEFAULT 'consulta',
  estado TEXT CHECK (estado IN ('pendiente', 'contactado', 'finalizado', 'cancelado')) DEFAULT 'pendiente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================
-- TABLA: admin_profiles
-- ============================================
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT CHECK (role IN ('admin', 'vendedor')) DEFAULT 'vendedor',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- ============================================
CREATE INDEX IF NOT EXISTS idx_vehicles_estado ON vehicles(estado);
CREATE INDEX IF NOT EXISTS idx_vehicles_marca ON vehicles(marca);
CREATE INDEX IF NOT EXISTS idx_vehicles_modelo ON vehicles(modelo);
CREATE INDEX IF NOT EXISTS idx_vehicles_precio ON vehicles(precio);
CREATE INDEX IF NOT EXISTS idx_vehicles_destacado ON vehicles(destacado) WHERE destacado = true;
CREATE INDEX IF NOT EXISTS idx_vehicles_año ON vehicles(año);
CREATE INDEX IF NOT EXISTS idx_pedidos_estado ON pedidos(estado);
CREATE INDEX IF NOT EXISTS idx_pedidos_created_at ON pedidos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pedidos_vehicle_id ON pedidos(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_email ON admin_profiles(email);

-- Índice GIN para búsqueda full-text en descripción
CREATE INDEX IF NOT EXISTS idx_vehicles_descripcion_fts ON vehicles USING gin(to_tsvector('spanish', coalesce(descripcion, '')));

-- ============================================
-- FUNCIONES
-- ============================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Función para incrementar views de un vehículo
CREATE OR REPLACE FUNCTION increment_vehicle_views(vehicle_uuid UUID)
RETURNS void AS $$
BEGIN
    UPDATE vehicles
    SET views = views + 1
    WHERE id = vehicle_uuid;
END;
$$ language 'plpgsql';

-- ============================================
-- TRIGGERS
-- ============================================
CREATE TRIGGER update_vehicles_updated_at
    BEFORE UPDATE ON vehicles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pedidos_updated_at
    BEFORE UPDATE ON pedidos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS PARA vehicles
-- ============================================

-- Lectura pública de vehículos disponibles
CREATE POLICY "Vehicles are viewable by everyone"
ON vehicles
FOR SELECT
USING (true);

-- Solo admins pueden insertar vehículos
CREATE POLICY "Only admins can insert vehicles"
ON vehicles
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid()
  )
);

-- Solo admins pueden actualizar vehículos
CREATE POLICY "Only admins can update vehicles"
ON vehicles
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid()
  )
);

-- Solo admins pueden eliminar vehículos
CREATE POLICY "Only admins can delete vehicles"
ON vehicles
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid()
  )
);

-- ============================================
-- POLÍTICAS PARA pedidos
-- ============================================

-- Cualquiera puede crear pedidos
CREATE POLICY "Anyone can create pedidos"
ON pedidos
FOR INSERT
WITH CHECK (true);

-- Solo admins pueden ver todos los pedidos
CREATE POLICY "Admins can view all pedidos"
ON pedidos
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid()
  )
);

-- Solo admins pueden actualizar pedidos
CREATE POLICY "Only admins can update pedidos"
ON pedidos
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid()
  )
);

-- Solo admins pueden eliminar pedidos
CREATE POLICY "Only admins can delete pedidos"
ON pedidos
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid()
  )
);

-- ============================================
-- POLÍTICAS PARA admin_profiles
-- ============================================

-- Los usuarios pueden ver su propio perfil
CREATE POLICY "Users can view own profile"
ON admin_profiles
FOR SELECT
USING (auth.uid() = id);

-- Los usuarios pueden insertar su propio perfil (durante registro)
CREATE POLICY "Users can insert own profile"
ON admin_profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Solo admins pueden actualizar perfiles
CREATE POLICY "Only admins can update profiles"
ON admin_profiles
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ============================================
-- DATOS DE EJEMPLO (SEED DATA)
-- ============================================

-- Insertar vehículos de ejemplo
INSERT INTO vehicles (marca, modelo, año, precio, kilometraje, combustible, transmision, carroceria, color, puertas, descripcion, caracteristicas, imagen_principal, estado, destacado) VALUES
('Toyota', 'Corolla', 2022, 25000, 15000, 'nafta', 'automatica', 'sedan', 'Blanco', 4, 'Excelente estado, único dueño, mantenimiento al día.', '["ABS", "Airbags", "Bluetooth", "Cámara de retroceso", "Sensores de estacionamiento"]'::jsonb, 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800', 'disponible', true),
('Ford', 'Ranger', 2023, 35000, 5000, 'diesel', 'manual', 'pickup', 'Negro', 4, 'Pickup robusta ideal para trabajo y aventura.', '["4x4", "ABS", "Airbags", "Bluetooth", "Caja de carga"]'::jsonb, 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800', 'disponible', true),
('Volkswagen', 'Gol', 2021, 18000, 25000, 'nafta', 'manual', 'hatchback', 'Rojo', 5, 'Auto económico y confiable, perfecto para ciudad.', '["ABS", "Airbags", "Bluetooth"]'::jsonb, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', 'disponible', false),
('Chevrolet', 'Onix', 2023, 22000, 8000, 'nafta', 'automatica', 'sedan', 'Gris', 4, 'Sedán moderno con excelente equipamiento.', '["ABS", "Airbags", "Bluetooth", "Cámara de retroceso", "Pantalla táctil"]'::jsonb, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', 'disponible', true),
('Fiat', 'Cronos', 2022, 19000, 20000, 'nafta', 'manual', 'sedan', 'Blanco', 4, 'Auto familiar con amplio espacio interior.', '["ABS", "Airbags", "Bluetooth", "Control de velocidad crucero"]'::jsonb, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', 'disponible', false),
('Renault', 'Duster', 2023, 32000, 10000, 'nafta', 'automatica', 'suv', 'Azul', 5, 'SUV versátil con excelente capacidad off-road.', '["4x4", "ABS", "Airbags", "Bluetooth", "Cámara de retroceso", "Techo solar"]'::jsonb, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', 'disponible', true),
('Peugeot', '208', 2022, 20000, 18000, 'nafta', 'manual', 'hatchback', 'Negro', 5, 'Hatchback deportivo con diseño moderno.', '["ABS", "Airbags", "Bluetooth", "Sensores de estacionamiento"]'::jsonb, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', 'disponible', false),
('Nissan', 'Frontier', 2023, 38000, 5000, 'diesel', 'manual', 'pickup', 'Blanco', 4, 'Pickup de trabajo con gran capacidad de carga.', '["4x4", "ABS", "Airbags", "Bluetooth", "Caja de carga reforzada"]'::jsonb, 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800', 'disponible', false),
('Hyundai', 'Creta', 2023, 30000, 7000, 'nafta', 'automatica', 'suv', 'Gris', 5, 'SUV compacta con excelente equipamiento tecnológico.', '["ABS", "Airbags", "Bluetooth", "Cámara de retroceso", "Pantalla táctil", "Android Auto"]'::jsonb, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', 'disponible', true),
('Jeep', 'Compass', 2022, 34000, 12000, 'nafta', 'automatica', 'suv', 'Negro', 5, 'SUV premium con diseño elegante y tecnología avanzada.', '["4x4", "ABS", "Airbags", "Bluetooth", "Cámara 360°", "Techo panorámico"]'::jsonb, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', 'disponible', true)
ON CONFLICT DO NOTHING;


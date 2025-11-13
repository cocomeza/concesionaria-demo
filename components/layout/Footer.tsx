import Link from 'next/link'
import { Car, Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Logo y Misión */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold">AutoElite</div>
                <div className="text-xs text-gray-400">Concesionaria Premium</div>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Tu concesionaria de confianza con los mejores vehículos del mercado.
            </p>
          </div>

          {/* Navegación */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/inicio"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/vehiculos"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Catálogo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-center sm:justify-start gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-cyan-500" />
                <span>+54 11 1234-5678</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-cyan-500" />
                <span>info@autoelite.com</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-cyan-500" />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-cyan-500 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-cyan-500 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://wa.me/541112345678"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-green-500 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center space-y-2">
          <p className="text-sm text-gray-400">
            © 2025 AutoElite - Concesionaria Premium. Todos los derechos reservados.
          </p>
          <p className="text-sm text-gray-500">
            Desarrollado por{' '}
            <a
              href="https://botoncreativo.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors underline"
            >
              Botón Creativo
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}


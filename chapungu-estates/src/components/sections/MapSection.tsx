import { MapPin, Phone, Mail, Navigation } from "lucide-react";

export function MapSection() {
  return (
    <section className="py-24 lg:py-32 bg-earth-50" aria-labelledby="map-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">
          {/* Info Panel */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="section-label mb-3">Find Us</div>
              <h2 id="map-heading" className="section-title mb-6">
                Visit
                <span className="italic text-brand-500"> Chapungu Estates</span>
              </h2>
              <p className="font-body text-earth-600 leading-relaxed mb-8">
                Chapungu Estates is situated in the heart of Norton, Mashonaland West — 
                approximately 40 minutes from Harare&apos;s city centre along the Bulawayo Road.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" />
                <div>
                  <div className="font-body font-semibold text-charcoal text-sm">Address</div>
                  <div className="font-body text-sm text-earth-600 mt-1">
                    Chapungu Estates, Norton<br />
                    Mashonaland West, Zimbabwe
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" />
                <div>
                  <div className="font-body font-semibold text-charcoal text-sm">Phone</div>
                  <a href="tel:+2637123456789" className="font-body text-sm text-earth-600 hover:text-brand-600 transition-colors mt-1 block">
                    +263 71 234 5678
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" />
                <div>
                  <div className="font-body font-semibold text-charcoal text-sm">Email</div>
                  <a href="mailto:info@chapunguEstates.co.zw" className="font-body text-sm text-earth-600 hover:text-brand-600 transition-colors mt-1 block">
                    info@chapunguEstates.co.zw
                  </a>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Norton+Zimbabwe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-outline-gold mt-4"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </div>

          {/* Map Embed */}
          <div className="lg:col-span-3 min-h-[400px] overflow-hidden border border-earth-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60974.17!2d30.6!3d-17.88!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931b5e8b14e4e3d%3A0x7b43a3ab8c6c6e2f!2sNorton%2C%20Zimbabwe!5e0!3m2!1sen!2szw!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chapungu Estates location on Google Maps"
              aria-label="Interactive map showing Chapungu Estates location in Norton, Zimbabwe"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

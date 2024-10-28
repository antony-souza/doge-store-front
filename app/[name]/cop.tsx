import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const Copyright = () => {
    return (
        <>
            <section className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <hr className="my-6 border-gray-300" />
                <p className="text-xl font-semibold text-gray-800">DogeStore - DuckEnterprise</p>

                <div className="mt-4 flex justify-center space-x-6">
                    {/* Instagram */}
                    <a href="https://www.instagram.com/srwalkerb/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700" aria-label="Instagram">
                        <span className="text-3xl">
                            <FaInstagram />
                        </span>
                    </a>

                    {/* WhatsApp */}
                    <a href="https://wa.me/5511967843053?text=Ol%C3%A1%2C%20vim%20pela%20DogeStore%20e%20gostaria%20de%20saber%20mais%21" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700" aria-label="WhatsApp">
                        <span className="text-3xl">
                            <FaWhatsapp />
                        </span>
                    </a>
                </div>

                <p className="text-gray-500 mt-4">
                    &copy; {new Date().getFullYear()} DogeStore - DuckEnterprise. Todos os direitos reservados.
                </p>
            </section>
        </>
    )
}
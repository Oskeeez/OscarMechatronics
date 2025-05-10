export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="font-poppins font-bold text-2xl">
              Oscar<span className="text-secondary">.Jones</span>
            </h3>
            <p className="mt-2">Mechatronics Design Engineer</p>
          </div>
          
          <div className="text-center md:text-right">
            <p>&copy; {currentYear} Oscar Jones. All rights reserved.</p>
            <p className="mt-2">Designed and built with precision</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

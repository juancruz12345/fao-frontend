import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TransitionWrapper = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLinkClick = (event) => {
      event.preventDefault();

      const url = event.currentTarget.href;
      const path = new URL(url).pathname;

      // Verificar si la API de ViewTransition está disponible
      if (typeof document.startViewTransition === "function") {
        document.startViewTransition(() => navigate(path));
      } else {
        // Fallback: Navegación directa si no está disponible
        navigate(path);
      }
    };

    // Agregar manejadores a todos los enlaces
    const links = document.querySelectorAll("a");
    links.forEach((link) => link.addEventListener("click", handleLinkClick));

    return () => {
      // Eliminar manejadores al desmontar
      links.forEach((link) => link.removeEventListener("click", handleLinkClick));
    };
  }, [navigate]);

  return children;
};

export default TransitionWrapper;

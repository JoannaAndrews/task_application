import { useNavigate } from "react-router";

const Header = ({ onLogout }: { onLogout: any }) => {
  const navigate = useNavigate();

  return (
    <header className="app-sidebar-header">
      <h1 className="sidebar-note-title">
        Task Application
      </h1>

      {/* Desktop Navigation */}
      <nav className="nav-styles">
        <button onClick={() => navigate("/")} className="text-base tracking-wider transition-colors hover:text-gray-300 z-30">
          Task Dashboard
        </button>
        <button onClick={() => navigate("/summary")} className="text-base tracking-wider transition-colors hover:text-gray-300 z-30">
          Analytics
        </button>
        <button onClick={() => navigate("/timer")} className="text-base tracking-wider transition-colors hover:text-gray-300 z-30">
          Study Timer
        </button>
        <button onClick={onLogout} className="hidden md:block bg-[#a7a7a7] text-black py-3 px-8 rounded-full border-none font-medium transition-all duration-500 hover:bg-white cursor-pointer z-50">
          Sign Out
        </button>
      </nav>



    </header>);

}

export default Header;
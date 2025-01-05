import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav>
      <div className=" px-[1rem] md:w-full mt-5 bg-opacity-50 backdrop-filter backdrop-blur-lg p-4 shadow-lg container md:mx-auto rounded-full border-[1px] border-neutral-800/80">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-xl font-bold ">
            TODO <span className="text-white/50 font-thin text-xl">APP</span>
          </Link>
          <ul className="flex space-x-4">
            <Button className="bg-slate-300/15 rounded-xl uppercase font-bold">
              <Link to="/register">Sign in</Link>
            </Button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { Link,  useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { userUserStore } from "@/store/userSlice";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const { email, fullName } = userUserStore();
  const navigate = useNavigate();
  return (
    <nav>
      <div className=" px-[1rem] md:w-full mt-5 bg-opacity-50 backdrop-filter backdrop-blur-lg p-4 shadow-lg container md:mx-auto rounded-full border-[1px] border-neutral-800/80">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-xl font-bold ">
            TODO <span className="text-white/50 font-thin text-xl">APP</span>
          </Link>
          <ul className="flex space-x-4">
            {email ? (
              <>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-white/20 hover:bg-white/20">
                      {fullName?.split("")[0].toUpperCase()}
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-neutral-900 shadow-lg ring-1 ring-white/10 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      <MenuItem>
                        <p className="block px-4 py-2 text-sm text-white/80 data-[focus]:bg-white/10 data-[focus]:text-white data-[focus]:outline-none">
                          {fullName}
                        </p>
                      </MenuItem>
                      <MenuItem>
                        <p className="block px-4 py-2 text-sm text-white/60 data-[focus]:bg-white/10 data-[focus]:text-white data-[focus]:outline-none">
                          {email}
                        </p>
                      </MenuItem>

                      <MenuItem>
                        <Button
                          onClick={async () => {
                            try {
                              const response = await axios.post(
                                "http://localhost:8000/api/v1/auth/logout",
                                {},
                                {
                                  withCredentials: true,
                                }
                              );
                              if (response.status === 200) {
                                toast.success(response.data.message);
                                window.location.reload();
                                navigate("/logout");
                              } else {
                                toast.error(response.data.message);
                              }
                            } catch (error) {
                              console.log(error);
                              toast.error("Something went wrong");
                            }
                          }}
                          className="block mx-3 px-4 py-2 text-left text-sm bg-neutral-700/30 text-red-400 data-[focus]:bg-white/10 data-[focus]:text-red-300 data-[focus]:outline-none"
                        >
                          Log out
                        </Button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              </>
            ) : (
              <>
                <Button className="bg-slate-300/15 rounded-xl uppercase font-bold">
                  <Link to="/register">Sign in</Link>
                </Button>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

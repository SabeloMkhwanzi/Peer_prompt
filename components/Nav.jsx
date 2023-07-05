"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProvider } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [togglesDropdown, setTogglesDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await setProviders();
      setProviders(response);
    };
    setProviders();
  }, []);

  return (
    <nav className="w-full pt-3 mb-16 flex-between">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          width={30}
          height={30}
          alt="peer prompts"
          src="/assets/images/logo.svg"
        />
        <p className="logo_text"> Peer Prompts</p>
      </Link>
      {/* Desktop nav */}
      <div className="hidden sm:flex">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                src="/assets/images/logo.svg"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile nav */}
      <div className="relative flex sm:hidden">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              src="/assets/images/logo.svg"
              onClick={() => setTogglesDropdown((prev) => !prev)}
            />
            {togglesDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setTogglesDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setTogglesDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setTogglesDropdown(false);
                    signOut();
                  }}
                  className="w-full mt-5 black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

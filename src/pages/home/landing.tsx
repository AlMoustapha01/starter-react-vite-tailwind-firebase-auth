import Atom from '../../assets/images/atom.png';
import { useI18nContext } from '../../i18n/i18n-react';
export default function Landing() {
  const { LL } = useI18nContext();
  return (
    <>
      <div className="container px-4 mx-auto">
        <div className="mb-16 relative bg-indigo-50 overflow-hidden rounded-3xl">
          <div className="relative z-20 flex flex-wrap items-center -m-8">
            <div className="w-full lg:w-1/2 p-20 lg:pr-0 lg:pl-28 lg:py-28">
              <h2 className="mb-7 text-6xl md:text-8xl xl:text-10xl font-bold font-heading tracking-px-n leading-none">
                {LL.home.title()}
              </h2>
              <p className="mb-10 text-lg text-gray-900 font-medium">{LL.home.subtitle()}</p>
              <div className="mb-6 md:inline-block">
                <p className=" font-semibold text-xl text-teal-800">{LL.home.feature.title()} & {LL.home.tools.title()}</p>
                <ul className="md:max-w-xs">
                  <li className="mb-5 flex flex-wrap">
                    <svg
                      className="mr-2"
                      width={25}
                      height={26}
                      viewBox="0 0 25 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.5 23C18.0228 23 22.5 18.5228 22.5 13C22.5 7.47715 18.0228 3 12.5 3C6.97715 3 2.5 7.47715 2.5 13C2.5 18.5228 6.97715 23 12.5 23ZM17.1339 11.3839C17.622 10.8957 17.622 10.1043 17.1339 9.61612C16.6457 9.12796 15.8543 9.12796 15.3661 9.61612L11.25 13.7322L9.63388 12.1161C9.14573 11.628 8.35427 11.628 7.86612 12.1161C7.37796 12.6043 7.37796 13.3957 7.86612 13.8839L10.3661 16.3839C10.8543 16.872 11.6457 16.872 12.1339 16.3839L17.1339 11.3839Z"
                        fill="#4F46E5"
                      />
                    </svg>
                    <span className="flex-1 font-medium leading-relaxed">
                      The best you can do in no time at all, amazing feature goes here
                    </span>
                  </li>
                  <li className="mb-5 flex flex-wrap">
                    <svg
                      className="mr-2"
                      width={25}
                      height={26}
                      viewBox="0 0 25 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.5 23C18.0228 23 22.5 18.5228 22.5 13C22.5 7.47715 18.0228 3 12.5 3C6.97715 3 2.5 7.47715 2.5 13C2.5 18.5228 6.97715 23 12.5 23ZM17.1339 11.3839C17.622 10.8957 17.622 10.1043 17.1339 9.61612C16.6457 9.12796 15.8543 9.12796 15.3661 9.61612L11.25 13.7322L9.63388 12.1161C9.14573 11.628 8.35427 11.628 7.86612 12.1161C7.37796 12.6043 7.37796 13.3957 7.86612 13.8839L10.3661 16.3839C10.8543 16.872 11.6457 16.872 12.1339 16.3839L17.1339 11.3839Z"
                        fill="#4F46E5"
                      />
                    </svg>
                    <span className="flex-1 font-medium leading-relaxed">
                      24/7 Support of our dedicated, highly professional team
                    </span>
                  </li>
                </ul>
              </div>
             
            </div>
            <div className="w-full lg:w-1/2 p-8">
              <img src={Atom} alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* <div className={`grid container mx-auto max-w-[1300px]`}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="grid content-center">
            <h1 className="font-bold text-4xl md:text-8xl py-3 mt-7 mf">
              <span className="text-teal-600 uppercase">{LL.home.title()}</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <span className="text-2xl md:text-4xl mt-7 p-1 text-red-500 border-4 border-red-300 font-semibold w-40">
                  {LL.home.feature.title()}
                </span>
                <ul className="list-disc p-10">
                  <li>Vite</li>
                  <li>Tailwindcss</li>
                  <li>Tailwindcss</li>
                </ul>
              </div>
              <div>
                <span className="text-2xl md:text-4xl mt-7 p-1 text-red-500 border-4 border-red-300 font-semibold w-24">
                  {LL.home.tools.title()}
                </span>
                <ul className="list-disc p-10">
                  <li>Vite</li>
                  <li>Tailwind css</li>
                  <li>Tailwindcss</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-end py-5">
            <img src={Atom} alt="" className="w-full md:w-auto" />
          </div>
        </div>
      </div> */}
    </>
  );
}

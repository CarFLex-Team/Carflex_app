"use client";

export default function AutoSwitch() {
  return (
    <div className="relative group inline-block h-9">
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" />
        <div
          className={`group peer ring-0 bg-linear-to-tr from-white via-gray-50 to-gray-100 rounded-full border border-gray-300 outline-none duration-300 after:duration-300
            w-16 h-9 shadow-md peer-focus:outline-none  after:rounded-full after:absolute after:bg-white  after:border  after:border-gray-400  after:h-7 after:w-7 after:top-1 after:left-1 
            after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-checked:after:content-['🤖'] peer-hover:after:scale-95 
            peer-checked:after:rotate-0 peer-checked:bg-linear-to-tr peer-checked:from-white peer-checked:via-primary peer-checked:to-primary`}
        ></div>
      </label>
      <div
        className="
        absolute top-6 right-17 shadow-md border border-gray-300
        whitespace-nowrap
        bg-white text-gray-600 text-sm px-2 py-1 rounded-2xl rounded-tr-none
        opacity-0 group-hover:opacity-100 transition
      "
      >
        ⓘ Auto E-mail Sending
      </div>
    </div>
  );
}

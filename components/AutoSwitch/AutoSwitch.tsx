"use client";

export default function AutoSwitch() {
  return (
    <div className="relative group inline-block">
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" />
        <div
          className={`group peer ring-0 bg-linear-to-tr from-rose-100 via-rose-400 to-rose-500 rounded-full outline-none duration-300 after:duration-300
            w-16 h-9 shadow-md peer-focus:outline-none  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-7 after:w-7 after:top-1 after:left-1 
            after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-checked:after:content-['🤖'] peer-hover:after:scale-95 
            peer-checked:after:rotate-0 peer-checked:bg-linear-to-tr peer-checked:from-white peer-checked:via-primary peer-checked:to-primary`}
        ></div>
      </label>
      <div
        className="
        absolute top-4 right-16 shadow-md border border-gray-300
        whitespace-nowrap
        bg-primary text-white text-sm px-2 py-1 rounded-2xl rounded-tr-none
        opacity-0 group-hover:opacity-100 transition
      "
      >
        ⓘ Auto E-mail Sending
      </div>
    </div>
  );
}

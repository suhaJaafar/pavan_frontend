// const fixedInputClass="rounded-md appearance-none relative block px-3 py-2 w-full border border-gray-300 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
// export default function Input({
//                                   handleChange,
//                                   value,
//                                   labelText,
//                                   labelFor,
//                                   id,
//                                   name,
//                                   type,
//                                   isRequired=false,
//                                   placeholder,
//                                   customClass
//                               }){

//     return(
//         <div className="my-5">
//             <label htmlFor={labelFor} className="sr-only">
//                 {labelText}
//             </label>
//             <input
//                 onChange={handleChange}
//                 value={value}
//                 id={id}
//                 name={name}
//                 type={type}
//                 required={isRequired}
//                 className={fixedInputClass+customClass}
//                 placeholder={placeholder}
//             />
//         </div>
//     )
// }

const fixedInputClass=" sm:text-base text-xs rounded-md appearance-none relative block sm:px-3 px-1  sm:py-2 py-1 w-full border border-gray-300 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10"

export default function Input({
    handleChange,
    value,
    labelText,
    labelFor,
    id,
    name,
    type,
    isRequired = false,
    placeholder,
    customClass
  }) {
    return (
      <div className="sm:my-5 my-2">
        <label htmlFor={labelFor} className="sr-only">
          {labelText}
        </label>
        <input
          onChange={handleChange}
          value={value}
          id={id}
          name={name}
          type={type}
          required={isRequired}
          className={fixedInputClass + customClass}
          placeholder={placeholder}
        />
      </div>
    );
  }


import React, {useEffect} from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const Login = () => {
     const navigate = useNavigate();
     useEffect(() => {
          const auth = localStorage.getItem("usersData")
if (auth) {
     navigate("/")
}
     }, [])
     
     const {
          register,
          handleSubmit,
          watch,
          formState: { errors },
     } = useForm();

     const onSubmit = async (data) => {
          const { email, password } = data
          console.log(data);
          let user = await fetch("http://localhost:3000/login",
               {
                    method: "POST",
                    body: JSON.stringify({ email, password }),
                    headers: {
                         "Content-Type": "application/json", // Specify the payload format
                    },

               }
          )
           user = await user.json()
           console.log(user)
           if (user.auth) {
                localStorage.setItem("usersData", JSON.stringify(user.user))
                localStorage.setItem("token", JSON.stringify(user.auth))
                navigate("/")
               
           } else {
               console.log("Please enter correct details")
           }
     };


     return (
          <section className="text-blue-800 body-font">
               <div className="container px-5 py-14 mx-auto flex flex-wrap items-center justify-center">
                    <form
                         onSubmit={handleSubmit(onSubmit)}
                         className="lg:w-2/6 md:w-1/2 bg-blue-50 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0"
                    >
                         <h2 className="text-blue-950 font-semibold underline underline-offset-4 decoration-blue-900 title-font mb-5 text-center text-3xl">
                              Login
                         </h2>

                         <div className="relative mb-4">
                              <label htmlFor="email" className="leading-7 text-sm text-blue-800">
                                   Email
                              </label>
                              <input
                                   {...register("email", {
                                        required: "Email is required",
                                        maxLength: {
                                             value: 25,
                                             message: "Max length is 20",
                                        },
                                        minLength: {
                                             value: 4,
                                             message: "Min length is 4",
                                        },
                                   })}
                                   type="email"
                                   className="w-full bg-white rounded border border-blue-300 focus:border-indigo-500 focus:ring-1 focus:ring-blue-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              />
                              {errors.email && (
                                   <p className="w-full text-xs text-red-700 py-1">{errors.email.message}</p>
                              )}
                         </div>

                         <div className="relative mb-4">
                              <label htmlFor="password" className="leading-7 text-sm text-blue-800">
                                   Password
                              </label>
                              <input
                                   {...register("password", {
                                        required: true,
                                        maxLength: {
                                             value: 12,
                                             message: "Max length is 12",
                                        },
                                        minLength: {
                                             value: 6,
                                             message: "Min length is 6",
                                        },
                                        //   validate: {
                                        //       hasNumber: (value) =>
                                        //           /\d/.test(value) || "Password must contain at least one digit",
                                        //       hasSpecialChar: (value) =>
                                        //           /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                                        //           "Password must contain at least one special character",
                                        //   },
                                   })}
                                   type="text"
                                   className="w-full bg-white rounded border border-blue-300 focus:border-indigo-500 focus:ring-1 focus:ring-blue-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              />
                              {errors.password && (
                                   <p className="w-full text-xs text-red-700 py-1">{errors.password.message}</p>
                              )}
                         </div>

                         <button className="text-white bg-blue-900 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-800 rounded text-lg uppercase">
                              Login
                         </button>
                    </form>
               </div>
          </section>
     );
};

export default Login;

import React from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom"

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Destructure the form data
    const { name, email, password } = data;

    try {
      let result = await fetch("http://localhost:3000/signUp", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json", // Specify the payload format
        },
      });
      result = await result.json();
      console.log(result); // Handle form submission response
      navigate("/");
      localStorage.setItem("usersData" , JSON.stringify(result.result))
      localStorage.setItem("token" , JSON.stringify(result.auth))
    } catch (error) {
      console.error("Error submitting the form:", error);
    }

  };

  return (
    <section className="text-gray-600 body-font relative h-fit">
      <div className="container px-5 py-10 -mt-2 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 mx-auto">
          <h2 className="text-blue-900 font-bold text-3xl mb-5 title-font uppercase text-center">
            Sign Up Here
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 20,
                    message: "Max Length is 20",
                  },
                  minLength: {
                    value: 4,
                    message: "Min Length is 4",
                  },
                })}
                type="text"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors.name && (
                <p className="text-blue-900 py-2 rounded text-xs">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                })}
                type="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors.email && (
                <p className="text-blue-900 py-2 rounded text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  maxLength: {
                    value: 20,
                    message: "Max length is 20",
                  },
                  minLength: {
                    value: 4,
                    message: "Min length is 4",
                  },
                  validate: {
                    hasNumber: (value) =>
                      /\d/.test(value) || "Password must contain at least one digit",
                    hasSpecialChar: (value) =>
                      /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain at least one special character",
                  },
                })}
                type="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors.password && (
                <p className="text-blue-900 my-2 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="text-white bg-blue-900 border-0 py-2 px-6 w-full focus:outline-none hover:bg-blue-900 rounded text-lg"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

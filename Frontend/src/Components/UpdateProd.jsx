
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
const UpdateProd = () => {
     const navigate = useNavigate()
     const params = useParams()
     useEffect(() => {
          getProdDetails()
     }, [])

     const getProdDetails = async () => {
          let result = await fetch(`http://localhost:3000/product/${params.id}`,
               {
                    headers:
                    {
                         authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
               }
          )
          result = await result.json();
          try {
               console.log(result);
               setValue("name", result.name || "");
               setValue("price", result.price || "");
               setValue("category", result.category || "");
               setValue("company", result.company || "");

          } catch (error) {
               console.log(`Error while fetching the Product ${error}`);

          }




     }


     const {
          register,
          handleSubmit,
          formState: { errors },
          setValue,
     } = useForm();
     const updateProd = async (data) => {
          console.log(data);
          const { name, price, _id, category, company } = data
          // let result = localStorage.getItem("usersData")
          if (!name || !price || !company || !category) {
               console.log(setError(true))
          }
          else {

               try {
                    
                    let result = await fetch(`http://localhost:3000/product/${params.id}`,
                         {
                              method: "PUT",
                              body: JSON.stringify({ name, price, _id, category, company }),
                              headers: {
                                   "Content-Type": "application/json", // Specify the payload format
                                   authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                              },
                         }

                    )
                    result = result.json()
                    console.log(result);
                    navigate('/')

               } catch (error) {
                    alert(error)
               }

          }

     }
     return (
          <section className="text-blue-800 body-font mb-20">
               <div className="container px-5 py-14 mx-auto flex flex-wrap items-center justify-center">
                    <form
                         onSubmit={handleSubmit(updateProd)}
                         className="lg:w-2/6 md:w-1/2 bg-blue-50 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
                         <h2 className="text-blue-950 font-semibold underline underline-offset-4 decoration-blue-900 title-font capitalize mb-5 text-center text-3xl">
                              Update product
                         </h2>

                         <div className="relative mb-4">
                              <label htmlFor="name" className="leading-7 text-sm text-blue-800 capitalize">
                                   name
                              </label>
                              <input
                                   {...register("name", {
                                        required: "name is required",
                                        maxLength: {
                                             value: 25,
                                             message: "Max length is 20",
                                        },
                                        minLength: {
                                             value: 4,
                                             message: "Min length is 4",
                                        },
                                   })}
                                   type="name"
                                   className="w-full bg-white rounded border border-blue-300 focus:border-indigo-500 focus:ring-1 focus:ring-blue-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              />
                              {errors.name && (
                                   <p className="w-full text-xs text-red-700 py-1">{errors.name.message}</p>
                              )}
                         </div>

                         <div className="relative mb-4">
                              <label htmlFor="price" className="leading-7 text-sm text-blue-800 capitalize">
                                   Price
                              </label>
                              <input
                                   {...register("price", {
                                        required: true,
                                        maxLength: {
                                             value: 7,
                                             message: "Max length is 7",
                                        },
                                        minLength: {
                                             value: 2,
                                             message: "Min length is 2",
                                        },

                                   })}
                                   type="numbers"
                                   className="w-full bg-white rounded border border-blue-300 focus:border-indigo-500 focus:ring-1 focus:ring-blue-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              />
                              {errors.price && (
                                   <p className="w-full text-xs text-red-700 py-1">{errors.price.message}</p>
                              )}
                         </div>
                         <div className="relative mb-4">
                              <label htmlFor="category" className="leading-7 text-sm text-blue-800 capitalize">
                                   category
                              </label>
                              <input
                                   {...register("category", {
                                        required: true,
                                        maxLength: {
                                             value: 12,
                                             message: "Max length is 12",
                                        },
                                        minLength: {
                                             value: 5,
                                             message: "Min length is 5",
                                        },

                                   })}
                                   type="text"
                                   className="w-full bg-white rounded border border-blue-300 focus:border-indigo-500 focus:ring-1 focus:ring-blue-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              />
                              {errors.category && (
                                   <p className="w-full text-xs text-red-700 py-1">{errors.category.message}</p>
                              )}
                         </div>

                         <div className="relative mb-4">
                              <label htmlFor="company" className="leading-7 text-sm text-blue-800 capitalize">
                                   company
                              </label>
                              <input
                                   {...register("company", {
                                        required: true,
                                        maxLength: {
                                             value: 12,
                                             message: "Max length is 12",
                                        },
                                        minLength: {
                                             value: 5,
                                             message: "Min length is 5",
                                        },

                                   })}
                                   type="text"
                                   className="w-full bg-white rounded border border-blue-300 focus:border-indigo-500 focus:ring-1 focus:ring-blue-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              />
                              {errors.company && (
                                   <p className="w-full text-xs text-red-700 py-1">{errors.company.message}</p>
                              )}
                         </div>

                         <button className="text-white bg-blue-900 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-800 rounded text-lg uppercase">
                              Update product
                         </button>
                    </form>
               </div>
          </section>
     )
}

export default UpdateProd

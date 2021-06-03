import { useForm } from "react-hook-form";

export type EmployeeFormValues = {
  name: string;
  department: string;
  phone: string;
  city: string;
  email: string;
  role?: boolean;
};

type EmployeeFormProps = {
  initialValues?: Partial<EmployeeFormValues>;
  onSubmit: (v: EmployeeFormValues) => void;
};

const inputClassName =
  "mt-1 px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-grey-800 rounded-md focus:outline-none border-2 focus:border-1";

export default function EmployeeForm(props: EmployeeFormProps) {
  const { register, handleSubmit } = useForm<EmployeeFormValues>({
    defaultValues: props.initialValues ?? {},
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid ">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      {...register("name")}
                      className={inputClassName}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      {...register("email")}
                      className={inputClassName}
                      required
                      placeholder="user@gmail.com"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Depatment
                    </label>
                    <input
                      {...register("department")}
                      className={inputClassName}
                      placeholder="Sales Team"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      {...register("city")}
                      className={inputClassName}
                      placeholder="Jakarta"
                    />
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        {...register("role")}
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-700"
                      >
                        Admin
                      </label>
                      <p className="text-gray-500">
                        Set this employee as an "Admin"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex items-center px-8 py-2 border border-transparent rounded-md 
                  shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {props.initialValues ? "Update Employee" : "Create Employee"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

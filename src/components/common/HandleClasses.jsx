import clsx from "clsx";

const HandleClasses = (formik, key) =>
    clsx({
        "border-red-500 ring-1 ring-red-500": formik.touched[key] && formik.errors[key],
        "border-green-500 ring-1 ring-green-500": formik.touched[key] && !formik.errors[key],
    });

export default HandleClasses;

import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import HomePage from "../views/HomePage";
import Categories from "../views/Categories";
import AddProducts from "../views/AddProducts";
import AddUser from "../views/AddUser";
import EditPage from "../views/EditPage";
import UploadImage from "../views/UploadImage";
import BaseLayout from "../views/BaseLayout";
import Toastify from 'toastify-js'

const base_url = 'https://h8-phase2-gc.vercel.app'

const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage base_url={base_url} />,
      loader: () => {
        if (localStorage.token) {
            Toastify({
                text: "Already logged in",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#FF0000",
                },
                onClick: function () { } // Callback after click
            }).showToast();
            return redirect('/')
        }

        return null
    }
    },
    {
      element: <BaseLayout />,
      loader: () => {
        if (!localStorage.getItem("access_token")) {
          Toastify({
            text: "Please login first",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#FF0000",
            },
            onClick: function () { } // Callback after click
        }).showToast();
          return redirect("/login");
        }
  
        return null;
      },
      children: [
        {
          path: "/",
          element: <HomePage base_url={base_url} />
        },
        {
          path: "/categories",
          element: <Categories base_url={base_url} />
        },
        {
          path: "/add-product",
          element: <AddProducts base_url={base_url} />
        },
        {
          path: "/add-user",
          element: <AddUser base_url={base_url} />
        },
        {
          path: "/edit/:id",
          element: <EditPage base_url={base_url} />
        },
        {
          path: "/upload-image/:id",
          element: <UploadImage base_url={base_url} />
        },
      ]
    },
  ]);

  export default router
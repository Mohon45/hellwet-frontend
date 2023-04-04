import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import parse from "html-react-parser";
import Moment from "moment";
import { Icon } from "@iconify/react";
import { Modal } from "../../shared/Modal";
import Navbar from "../../shared/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingOverlay from "../../shared/LoadingOverlay/LoadingOverlay";
import DeleteAlert from "../../shared/DeleteAlert";

const Home = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [modal, setModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [readTodo, setReadTodo] = useState({});
  const [selectId, setSelectId] = useState(null);

  useEffect(() => {
    axios
      .get("https://hellwet-task.onrender.com/api/todo", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setTodos(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [todos]);

  // console.log(selectId);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    let newTodo = {
      title: title,
      description: content,
    };

    if (selectId) {
      axios
        .put(
          `https://hellwet-task.onrender.com/api/todo/update/${selectId}`,
          newTodo,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          toast.success("successfully Update");
          setLoading(false);
          setContent("");
          setTitle("");
          setSelectId(null);
        })
        .catch((error) => {
          setLoading(false);
          toast.error("something Wrong!");
        });
    } else {
      axios
        .post("https://hellwet-task.onrender.com/api/todo/create", newTodo, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          toast.success("success created");
          setLoading(false);
          setContent("");
          setTitle("");
          setSelectId(null);
        })
        .catch((error) => {
          setLoading(false);
          toast.error("something Wrong!");
        });
    }
  };

  const onDeleteHandler = (id) => {
    DeleteAlert(() => handleDelete(id));
  };

  const handleDelete = (id) => {
    setLoading(true);
    axios
      .post(`https://hellwet-task.onrender.com/api/todo/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success("todo delete success");
        setLoading(false);
      })
      .catch((error) => {
        toast.error("something wrong!");
        setLoading(false);
      });
  };

  const onViewHandler = (id) => {
    axios
      .get(`https://hellwet-task.onrender.com/api/todo/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setReadTodo(res.data.data);
        setModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editViewHandler = (id) => {
    axios
      .get(`https://hellwet-task.onrender.com/api/todo/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTitle(res.data.data.title);
        setContent(res.data.data.description);
        setSelectId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <LoadingOverlay active={loading}>
      <div>
        <Navbar />
        <div className="w-[100%] flex">
          <div className="w-[25%] h-[88vh] bg-[#e2edf598] sidebar">
            {todos ? (
              <>
                {todos.map((item, index) => (
                  <div className="px-4 my-6" key={index}>
                    <div className="h-[150px] border-2 border-green-500 rounded-md hover:bg-[#22c55e3d] cursor-pointer p-2 mb-2">
                      <div className="flex justify-between">
                        <h1 className="text-2xl font-bold">
                          {item.title.slice(0, 15)}
                        </h1>
                        <div className="flex">
                          <Icon
                            icon="material-symbols:edit-document-outline"
                            fontSize={30}
                            color="#22C55E"
                            onClick={() => {
                              editViewHandler(item._id);
                            }}
                          />
                          <Icon
                            icon="material-symbols:scan-delete-outline"
                            fontSize={30}
                            color="#22C55E"
                            className="ml-5"
                            onClick={() => {
                              onDeleteHandler(item._id);
                            }}
                          />
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          onViewHandler(item._id);
                        }}
                      >
                        <p className="text-justify mt-2">
                          {parse(item.description.slice(0, 50))}
                        </p>
                        <p className="mt-2 text-[#0d0404aa]">
                          date: {Moment(`${item.date}`).format("DD-MM-YYYY")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <h1 className="text-xl ml-8 mt-10">Data Loading....</h1>
            )}
          </div>
          <div className="w-[75%] p-10">
            {/* <h1 className="mb-4 text-2xl font-semibold">Create a New Todo</h1> */}
            <form onSubmit={onSubmitHandler}>
              <div className="w-[100%] flex">
                <label htmlFor="title" className="text-xl mr-2 mt-1">
                  Title:
                </label>
                <input
                  to="title"
                  type="text"
                  value={title ? title : ""}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  placeholder="type your todo title"
                  className="w-[100%] border-2 border-green-500 focus:outline-none rounded-md px-4 py-2 mb-4"
                />
              </div>
              <JoditEditor
                ref={editor}
                value={content}
                onChange={(newContent) => setContent(newContent)}
                showXPathInStatusbar={false}
              />

              {selectId ? (
                <div>
                  <button
                    type="submit"
                    className="text-xl bg-green-500 text-white rounded-md px-6 py-2 mt-4"
                  >
                    Update
                  </button>
                  <button
                    type="submit"
                    onClick={() => {
                      setTitle("");
                      setContent("");
                      setSelectId(null);
                    }}
                    className="text-xl bg-green-500 text-white rounded-md px-6 py-2 mt-4 ml-2"
                  >
                    Reset and Create a New Todo
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  className="text-xl bg-green-500 text-white rounded-md px-6 py-2 mt-4"
                >
                  Save
                </button>
              )}
            </form>
          </div>
        </div>
        {modal && (
          <Modal
            title={readTodo?.title}
            setModal={setModal}
            body={
              <div>
                <div className="h-[300px]  w-[95%] mx-auto overflow-y-auto px-5 pb-5">
                  {parse(readTodo?.description)}
                </div>
                <div>
                  {/* <p>Date: {Moment(`${readTosdo.date}`).format("DD-MM-YYYY")}</p> */}
                </div>
              </div>
            }
          />
        )}
      </div>
    </LoadingOverlay>
  );
};

export default Home;

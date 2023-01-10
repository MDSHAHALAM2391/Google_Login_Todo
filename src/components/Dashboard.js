
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Headers from "./Headers";

const getAllData = () => {
  const allData = localStorage.getItem("studentsList");
  if (allData) {
    return JSON.parse(allData);
  } else {
    return [];
  }
};

function Dashboard() {
  const [data, setData] = useState(getAllData());
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [city, setCity] = useState("");
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = React.useState(0);

  const handleClose = () => {
    setShow(false);
    setName("");
    setCourse("");
    setCity("");
  };

  const handleShow = (id) => {
    let update = data.find((ele) => {
      return ele.name === id;
    });
    //  console.log(update)
    setName(update.name);
    setCity(update.city);
    setCourse(update.course);
    setEdit(id);
    setShow(true);
  };

  const updateSubmission = (e) => {
    e.preventDefault();
    const updatedData = data.map((ele) => {
      // console.log(ele)
      if (ele.name === edit) {
        return { ...ele, name, city, course };
      }
      return ele;
    });
    setData(updatedData);
    setShow(false);
    setName("");
    setCourse("");
    setCity("");
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    const x = JSON.parse(localStorage.getItem("studentsList"));
    const y = x.find((ele) => ele.name === name);
    if (y) {
      alert("Name already taken");
      //   setName("");
      //   setCourse("");
      //   setCity("");
      return;
    }
    let allCred = {
      name,
      course,
      city,
    };
    setData([allCred, ...data]);
    setName("");
    setCourse("");
    setCity("");
  };

  useEffect(() => {
    localStorage.setItem("studentsList", JSON.stringify(data));
  }, [data]);

  const delteData = (id) => {
    const newData = data.filter((value, index) => {
      return value.name !== id;
    });
    setData(newData);
  };

  const pageData = React.useMemo(() => {
    return data
      .filter((ele) => ele.name.toLowerCase().includes(query))
      .slice(page * 3, page * 3 + 3);
  }, [data, page, query]);

  const nextPage = () => {
    setPage((prev) => prev + 1); //next page
  };

  const prevPage = () => {
    setPage((prev) => (prev > 0 ? prev - 1 : prev));
  };
  return (
    <>
      <div>
        <Headers />
      </div>
      <div style={{ maxWidth: "70%", margin: "0 auto", marginTop: "30px" }}>
        <h2>CRUD</h2>
        <div className="row" style={{ marginTop: "30px" }}>
          <div className="col-md-4">
            <form>
              <div className="form-group">
                <input
                  type="text"
                  required
                  placeholder="Name"
                  value={name}
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  style={{ marginBottom: "7px" }}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  required
                  placeholder="Course"
                  value={course}
                  className="form-control"
                  onChange={(e) => setCourse(e.target.value)}
                  style={{ marginBottom: "7px" }}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={city}
                  className="form-control"
                  onChange={(e) => setCity(e.target.value)}
                  style={{ marginBottom: "7px" }}
                />
              </div>
              <div className="form-group">
                <button
                  className="btn btn-md btn-primary"
                  onClick={handleSubmission}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
              className="form-control"
            />
            <br />
            {data.length > 0 ? (
              <>
                <table className="table table-stried">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Course</th>
                      <th>City</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.map((ele, i) => {
                      return (
                        <tr key={i}>
                          <td>{ele.name}</td>
                          <td>{ele.course}</td>
                          <td>{ele.city}</td>
                          <td>
                            <span
                              style={{ cursor: "pointer", color: "red" }}
                              onClick={() => delteData(ele.name)}
                            >
                              delete{" "}
                            </span>
                            <span
                              style={{ cursor: "pointer", color: "grey" }}
                              onClick={() => handleShow(ele.name)}
                            >
                              Edit
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button
                  className="btn btn-md btn-danger"
                  onClick={() => setData([])}
                >
                  Delete All
                </button>
              </>
            ) : (
              <h2>No data found</h2>
            )}

            <button
              style={{ float: "right" }}
              onClick={nextPage}
              disabled={page * 3 + 3 === Math.ceil(data.length)}
              className="btn btn-sm btn-primary"
            >
              Next
            </button>
            <button
              style={{ float: "right", marginRight: "7px" }}
              onClick={prevPage}
              className="btn btn-sm btn-primary mr-4"
              disabled={page === 0}
            >
              Prev
            </button>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    required
                    placeholder="Enter Name"
                    value={name}
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: "7px" }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    required
                    placeholder="Enter Course"
                    value={course}
                    className="form-control"
                    onChange={(e) => setCourse(e.target.value)}
                    style={{ marginBottom: "7px" }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    required
                    placeholder="Enter City"
                    value={city}
                    className="form-control"
                    onChange={(e) => setCity(e.target.value)}
                    style={{ marginBottom: "7px" }}
                  />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-md btn-primary"
                    onClick={updateSubmission}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Dashboard;
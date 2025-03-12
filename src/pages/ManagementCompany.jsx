import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { Box, Fade, Modal } from "@mui/material";

import Backdrop from "@mui/material/Backdrop";
import { companyCreate } from "../features/company/companySlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ManagementCompany = () => {
  const loading = useSelector((state) => state.product.loading);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    industry: "",
    foundedYear: "",
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };
  useEffect(() => { }, [dispatch]);

  const override = {
    display: "block",
    margin: "0 auto",
  };

  if (loading) {
    return <ClipLoader size={60} color="#ecc20e" cssOverride={override} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(companyCreate(formValue));
    setAddModalOpen(false);
  };

  return (
    <div className="product-content">
      <button
        className="order-button"
        onClick={() => {
          setAddModalOpen(true);
        }}
        style={{ marginLeft: 0, width: "150px" }}
      >
        Add Company
      </button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={addModalOpen}
        onClose={() => {
          setAddModalOpen(false);
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={addModalOpen}>
          <Box sx={style}>
            <form className="form" onSubmit={handleSubmit}>
              <button className="exit" onClick={() => setAddModalOpen(false)}>
                X
              </button>
              <div className="add-form">
                <h1 className="new-product">Create Company</h1>
              </div>

              <div className="form-input">
                <input
                  type="text"
                  placeholder="Company Name"
                  name="name"
                  value={formValue.name}
                  onChange={onChange}
                />
              </div>
              <div className="form-input">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formValue.email}
                  onChange={onChange}
                />
              </div>

              <div className="form-input">
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  value={formValue.phone}
                  onChange={onChange}
                />
              </div>

              <div className="form-input">
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={formValue.address}
                  onChange={onChange}
                />
              </div>

              <div className="form-input">
                <input
                  type="text"
                  placeholder="website"
                  name="website"
                  value={formValue.website}
                  onChange={onChange}
                />
              </div>

              <div className="form-input">
                <input
                  type="text"
                  placeholder="industry"
                  name="industry"
                  disabled
                  value={formValue.industry}
                  onChange={onChange}
                />
              </div>

              <div className="form-input">
                <input
                  type="text"
                  placeholder="foundedYear"
                  name="foundedYear"
                  disabled
                  value={formValue.founedYear}
                  onChange={onChange}
                />
              </div>
              <div className="form-input">
                <button className="product-btn">Add Company</button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ManagementCompany;

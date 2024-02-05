import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  bio: Yup.string(),
  dogBreed: Yup.string(),
  dogSize: Yup.string(),
  city: Yup.object().shape({
    label: Yup.string().required("City is required"),
    value: Yup.string().required("City is required"),
  }),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
});

function ProfileForm({ profileData, onUpdateProfile }) {
  return (
    <Formik
      initialValues={{
        name: profileData.name || "",
        bio: profileData.bio || "",
        dogBreed: profileData.dogBreed || "",
        dogSize: profileData.dogSize || "",
        city: profileData.city || null,
        dateOfBirth: profileData.dateOfBirth || null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onUpdateProfile(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="name">Name:</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="bio">Bio:</label>
            <Field as="textarea" name="bio" />
          </div>
          <div>
            <label htmlFor="dogBreed">Dog Breed:</label>
            <Field type="text" name="dogBreed" />
          </div>
          <div>
            <label htmlFor="dogSize">Dog Size:</label>
            <Field type="text" name="dogSize" />
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <Select
              name="city"
              onChange={(selectedOption) => setFieldValue("city", selectedOption)}
              options={[{ label: "City 1", value: "city1" }, { label: "City 2", value: "city2" }]}
            />
            <ErrorMessage name="city" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <DatePicker
              selected={profileData.dateOfBirth}
              onChange={(date) => setFieldValue("dateOfBirth", date)}
            />
            <ErrorMessage name="dateOfBirth" component="div" className="error" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Save Profile
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default ProfileForm;

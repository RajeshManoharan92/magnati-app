import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./register.css";
import {
  IonFooter,
  IonHeader,
  IonCol,
  IonGrid,
  IonRow,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonInput,
  IonItem,
  IonList,
  IonToolbar,
  IonTitle,
  IonPage,
  IonContent,
  useIonViewWillEnter,
  useIonViewDidEnter,
  withIonLifeCycle,
  useIonToast,
} from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import RegisterOTP from "../OTPPage/otppage";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const Navigate = useHistory();

  let initialized = false;

  const [array, setarray] = useState<any>([]);

  const [otp, setotp] = useState<any>();

  const [disabled, setdisabled] = useState<any>(true);

  const [otpdisabled, setotpdisabled] = useState<any>(true);

  // useIonViewWillEnter(() => {
  //   effect();
  // }, []);

  // const effect = async () => {
  //   if (!initialized) {
  //     initialized = true;
  //     // My actual effect logic...
  //     await axios
  //       .get("https://jsonplaceholder.typicode.com/posts")
  //       .then((res) => setarray(res.data));
  //   }
  // };

  // console.log(array, "array");

  //   useIonViewWillEnter(() => {
  //       axios.get("https://jsonplaceholder.typicode.com/posts").then((res)=>console.log(res))

  // });

  var initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobile: "",
    otp: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
  } = useForm({
    defaultValues: initialValues,
  });

  const onSubmit = async (data: any) => {
    console.log(data, "data");
    const redata = data;
    await axios
      .post("http://192.168.0.132:8000/customerOnboarding", redata)
      .then((res) => {
        console.log(res.data, "data");
        localStorage.setItem("userId", res.data.userId ? res.data.userId : "");
        reset();
         Navigate.push("/registerOTP");
        // presentToast("top");
      })
      .catch((err) => console.log(err));
  };



  const sendOTP = () => {
    // console.log(Math.floor(100000 + Math.random() * 900000));
    const val = Math.floor(100000 + Math.random() * 900000);
    const newotp = val.toString();
    console.log(newotp, "iv");
    setotp(newotp);

    setValue("otp", newotp);
    setdisabled(false);
    setotpdisabled(true);
  };

  const inputChange = (fieldname) => {
    clearErrors([fieldname]);
    setotp("");
    setdisabled(true);
    setotpdisabled(false);
  };

  return (
    <div>
      <IonPage>
        <IonHeader>
          <IonRow class="ion-align-items-center">
            <IonCol size="6">
              {" "}
              <img src="magnatinew.png" />
            </IonCol>
            <IonCol size="6">
              <a href="javascript:void(0);"> عربى </a>
            </IonCol>
          </IonRow>
        </IonHeader>

        <IonContent scrollbar="true">
          <IonRow class="ion-align-items-center ion-justify-content-center row">
            <IonCol size="12" size-md="8" size-lg="4">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Registration Form</IonCardTitle>
                </IonCardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <IonCardContent>
                    <IonList>
                      <IonItem>
                        <IonInput
                          label="First Name"
                          labelPlacement="stacked"
                          clearInput={true}
                          placeholder="Enter First Name"
                          // value={formvalue.firstName}
                          {...register("firstName", {
                            required: "First Name is required",
                          })}
                          onIonInput={() => inputChange("firstName")}
                        ></IonInput>
                      </IonItem>
                      <p>{errors.firstName?.message}</p>
                      <IonItem>
                        <IonInput
                          label="Middle Name"
                          labelPlacement="stacked"
                          clearInput={true}
                          placeholder="Enter Middle Name"
                          onIonInput={() => inputChange("middleName")}
                          // value={formvalue.lastName}
                          {...register("middleName", {
                            required: "Middle Name is required",
                            // maxLength: {
                            //   value: 4,
                            //   message: "must be four characters",
                            // },
                          })}
                        ></IonInput>
                      </IonItem>
                      <p>{errors.middleName?.message}</p>
                      <IonItem>
                        <IonInput
                          label="Last Name"
                          labelPlacement="stacked"
                          clearInput={true}
                          placeholder="Enter Last Name"
                          onIonInput={() => inputChange("lastName")}
                          // value={formvalue.lastName}
                          {...register("lastName", {
                            required: "Last Name is required",
                            // maxLength: {
                            //   value: 10,
                            //   message: "must be four characters",
                            // },
                          })}
                        ></IonInput>
                      </IonItem>
                      <p>{errors.lastName?.message}</p>
                      <IonItem>
                        <IonInput
                          label="Email Address"
                          labelPlacement="stacked"
                          type="email"
                          clearInput={true}
                          placeholder="Enter Email Address"
                          onIonInput={() => inputChange("email")}
                          // value={formvalue.email}
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                              message: "Please Enter Valid Email Id",
                            },
                          })}
                        ></IonInput>
                      </IonItem>
                      <p>{errors.email?.message}</p>
                      <IonItem>
                        <IonInput
                          label="Mobile Number"
                          labelPlacement="stacked"
                          type="number"
                          clearInput={true}
                          placeholder="Enter Mobile Number"
                          onIonInput={() => inputChange("mobile")}
                          {...register("mobile", {
                            required: "Mobile Number is required",
                            pattern: {
                              value:
                                /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g,
                              message: "Please Enter Valid Mobile Number",
                            },
                            maxLength: {
                              value: 10,
                              message: "Please Enter Valid Mobile Number",
                            },
                          })}

                          // value={formvalue.mobileNumber}
                        ></IonInput>
                      </IonItem>
                      <p>{errors.mobile?.message}</p>
                      {/* <IonItem>
                        <IonInput
                          label="OTP"
                          value={otp}
                          labelPlacement="stacked"
                          clearInput={true}
                          placeholder="Enter OTP"
                          onIonInput={() => setdisabled(true)}
                          {...register("otp", {
                            required: "OTP is Required",
                            // maxLength: {
                            //   value: 6,
                            //   message: "Enter six Numbers",
                            // },
                          })}
                        ></IonInput>
                      </IonItem> */}
                      {/* <p>{errors.otp?.message}</p> */}
                    </IonList>

                    <IonButton
                      type="submit"
                      // disabled={disabled}
                      routerDirection="none"
                    >
                      REGISTER
                    </IonButton>

                    
                  </IonCardContent>
                </form>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonContent>

        {/* <IonContent>
          {array?.length > 0
            ? array?.map((el: any, i: number) => {
                return (
                  <>
                    <ul key={i}>
                      <li>{el.title}</li>
                    </ul>
                  </>
                );
              })
            : ""}
        </IonContent> */}

        

        <IonFooter>
          <IonRow class="ion-align-items-center">
            <IonCol size="12">
              {" "}
              Copyright (c) 2023 Magnati. All Rights Reserved.
            </IonCol>
          </IonRow>
        </IonFooter>
      </IonPage>
    </div>
  );
};

export default Register;

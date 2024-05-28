import { Button } from "app/components/shared/Button";
import { Modal } from "app/components/shared/Modal";
import styles from "./Profile.module.scss";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { TextField } from "app/components/shared/TextField";
import { ProfileImage } from "./ProfileImage/ProfileImage";
import {
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useLogoutMutation,
  useRetrieveUserQuery,
} from "app/redux/features/authApiSlice";
import { Loader } from "app/components/shared/Loader";
import { toast } from "react-toastify";
import { useAppDispatch } from "app/redux/hooks";
import { useRouter } from "next/navigation";
import { logout as setLogout } from "app/redux/features/authSlice";
import Cookies from "js-cookie";
import { FormError } from "app/components/home/auth/FormError";
import { FormSuccess } from "app/components/home/auth/FormSuccess";

import StripeComponent from "app/components/shared/Subscription/StripeComponent";
import Link from "next/link";

export default function ProfileContent() {
  const router = useRouter();
  const { data: user, isLoading, isFetching } = useRetrieveUserQuery();
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [isEditPasswordOpen, setIsEditPasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePassword2, setVisiblePassword2] = useState(false);
  const [visiblePassword3, setVisiblePassword3] = useState(false);
  const [visiblePassword4, setVisiblePassword4] = useState(false);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [delete2, { isLoading: isLoading2 }] = useDeleteAccountMutation();
  const [changePassword2, { isLoading: isLoading3 }] =
    useChangePasswordMutation();

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(user);
    setPassword(event.target.value);
  };

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleNewPassword2Change = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword2(event.target.value);
  };

  const handleCurrentPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPassword(event.target.value);
  };

  if (isLoading || isFetching) {
    return (
      <div className={styles.profile}>
        <Loader color="orange" />
      </div>
    );
  }

  function deleteAccount() {
    delete2({ current_password: password })
      .unwrap()
      .then(() => {
        const cookies = Cookies.get();

        // Delete each cookie
        for (let cookie in cookies) {
          Cookies.remove(cookie);
        }

        dispatch(setLogout());
        toast.success("Account deleted");
        // router.push('/auth/login');
      })
      .catch((e) => {
        toast.error("Problem deleting account, please try again");
      });
  }

  function changePassword() {
    changePassword2({
      new_password: newPassword,
      re_new_password: newPassword2,
      current_password: currentPassword,
    })
      .unwrap()
      .then(() => {
        toast.success("Password changed successfully");
      })
      .catch((e) => {
        toast.error("Problem changing password account, please try again");
      });
  }

  return (
    <div className={styles.profile}>
      <ProfileImage />
      <div className={styles.profileContent}>
      {/* <StripeComponent /> */}
        <ul className={styles.userData}>
          <li>
            <TextField label="First Name">
              <input type="text" disabled={true} value={user?.first_name} />
            </TextField>
          </li>
          <li>
            <TextField label="Last Name">
              <input type="text" disabled={true} value={user?.last_name} />
            </TextField>
          </li>
          <li>
            <TextField label="Email">
              <input type="text" disabled={true} value={user?.email} />
            </TextField>
          </li>
          <li>
            <TextField label="Subscription">
              <input type="text" disabled={true} value="Free explorer" />
            </TextField>
          </li>
          <li>
            <TextField label="Mother lenguage">
              <input type="text" disabled={true} value="English" />
            </TextField>
          </li>
        </ul>
        <ul className={styles.userOptions}>
          {/* <li>Edit names</li> */}
          
          <li
            onClick={() => {
              setIsEditPasswordOpen(true);
              console.log(user);
            }}
          >
            Change password
          </li>
          <li><Link href="/logged/pricing" className={styles.link}>Change subscription</Link></li>
          <li
            onClick={() => {
              setIsDeleteAccountOpen(true);
            }}
          >
            Delete account
          </li>
        </ul>
      </div>
      <Modal
        isOpen={isDeleteAccountOpen}
        onClose={() => {
          setIsDeleteAccountOpen(false);
        }}
        title="Delete account"
      >
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
          </svg>
          <p>
            Are you sure you want to delete your account, once you delete it you
            can no longer recover it. Please type your password to confirm.
          </p>
        </div>
        <TextField label={"Password"}>
          <input
            type={visiblePassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
          />
          {!visiblePassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              onClick={() => setVisiblePassword(!visiblePassword)}
            >
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              onClick={() => setVisiblePassword(!visiblePassword)}
            >
              <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
            </svg>
          )}
        </TextField>
        <div>
          <Button
            onClick={() => {
              setIsDeleteAccountOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button outlined={true} onClick={deleteAccount}>
            Delete
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={isEditPasswordOpen}
        onClose={() => {
          setIsEditPasswordOpen(false);
        }}
        title="Change Password"
      >
        <form>
          <TextField label="Current password">
            <input
              type={visiblePassword2 ? "text" : "password"}
              onChange={handleCurrentPasswordChange}
            />
            {!visiblePassword2 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                onClick={() => setVisiblePassword2(!visiblePassword2)}
              >
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                onClick={() => setVisiblePassword2(!visiblePassword2)}
              >
                <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
              </svg>
            )}
          </TextField>
          <TextField label="New password">
            <input
              type={visiblePassword3 ? "text" : "password"}
              onChange={handleNewPasswordChange}
            />
            {!visiblePassword3 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                onClick={() => setVisiblePassword3(!visiblePassword3)}
              >
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                onClick={() => setVisiblePassword3(!visiblePassword3)}
              >
                <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
              </svg>
            )}
          </TextField>
          <TextField label="Repeat new password">
            <input
              type={visiblePassword4 ? "text" : "password"}
              onChange={handleNewPassword2Change}
            />
            {!visiblePassword4 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                onClick={() => setVisiblePassword4(!visiblePassword4)}
              >
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                onClick={() => setVisiblePassword4(!visiblePassword4)}
              >
                <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
              </svg>
            )}
          </TextField>
          <FormError message={error} />
          <FormSuccess message={success} />
        </form>
        <div>
          <Button
            onClick={() => {
              setIsEditPasswordOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button outlined={true} onClick={changePassword}>
            Change password
          </Button>
        </div>
      </Modal>
    </div>
  );
}

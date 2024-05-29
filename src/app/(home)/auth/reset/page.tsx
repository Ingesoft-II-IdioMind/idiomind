import { ResetForm } from "app/components/home/auth/ResetForm";
import styles from "../../../../components/home/auth/Auth.module.scss";

const ResetPage = () => {
    return ( 
        <div className={styles.auth}>
            <ResetForm />
        </div>
      
    );
  }
   
  export default ResetPage;
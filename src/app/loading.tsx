import { height } from "@fortawesome/free-solid-svg-icons/faBook";
import { Loader } from "app/components/shared/Loader";

export default function Loading(){
    return (
        <div className="center" style={{height: '100%', display:'flex', alignItems:'center',justifyContent:'center'}}>
            <Loader color="orange" />
        </div>
    );
}
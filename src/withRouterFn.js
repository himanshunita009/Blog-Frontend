import { useLocation,useNavigate,useParams } from "react-router-dom";

function withRouter(Component){
    function ComponentWithRouterProp(props){
        let location = useLocation();
        let navigation = useNavigate();
        let params = useParams();
        return(
            <Component 
                {...props}
                router = {{location,params,navigation}}
            />
        );
    }
    return ComponentWithRouterProp
}

export default withRouter;

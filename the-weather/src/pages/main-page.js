import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link
} from "react-router-dom";
import {HomePage} from "./home-page";
import {Routes} from "../common/constants/routes";
import {AboutPage} from "./about-page";
import {CitiesListPage} from "./cities-list-page";

export const MainPage = () => {
    return (
        <Router>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{width: '20%'}}>
                    <nav>
                        <ul>
                            <li><Link to={Routes.home}>Home</Link></li>
                            <li><Link to={Routes.citiesList}>Cities list</Link></li>
                            <li><Link to={Routes.about}>About</Link></li>
                        </ul>
                    </nav>
                </div>
                <div style={{width: '80%'}}>
                    <Switch>
                        <Route path={Routes.home} element={<HomePage/>} />
                        <Route path={Routes.citiesList} element={<CitiesListPage/>} />
                        <Route path={Routes.about} element={<AboutPage/>} />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

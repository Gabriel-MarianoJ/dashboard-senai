import AreaChart from "../components/AreaChart";
import BarChart from "../components/BarChart";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LineChart from "../components/LineChart";


const Home = () => {
    return (
        <>
            <Header />

            <div className="container">
                <div className="row mt-5">
                    <div className="col-sm-12">
                        <AreaChart />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-sm-6">
                        <LineChart />
                    </div>
                    <div className="col-sm-6">
                        <BarChart />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Home;
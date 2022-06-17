import React, { useState } from 'react'
import Base from '../Base';
import { AlumniData } from '../../auth/traineehelper/TraineeIndex';
import '../css/TraineeDashBoard.css';

const AlumniIndex = () => {

    const [Data, setData] = useState({
        department: "",
        loading: false,
    });

    const [alumniDatadisplay, setAlumniData] = useState([]);
    const [alumniSearch, setalumniSearch] = useState("");
    const { department, loading } = Data;

    const handleChange = (val) => (event) => {
        setData({ ...Data, [val]: event.target.value });
    }

    const searchHandler = () => (e) => {
        setalumniSearch(e.target.value);
    }

    const loadingmsg = () => {
        return (
            loading && (
                <div className="row p-3">
                    <div className="col-md-12">
                        <h5 className="text-success">Loading....<i class='bx bx-loader bx-spin' ></i></h5>
                    </div>
                </div>
            )
        )
    }
    const OnSubmit = () => {
        if (department === "***Select Department" || department === "") {
            alert('Please Enter Department');
        } else {
            setData({ ...Data, loading: true })
            AlumniData(department)
                .then(res => {
                    console.log(res);
                    if (res.data.success === true) {
                        console.log(res.data.data)
                        setAlumniData(res.data.data);
                        setData({ ...Data, loading: false });
                    } else {
                        alert('error in fetching data');
                    }
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    const filteralumni = alumniDatadisplay.filter(alu => {
        return alu.email.includes(alumniSearch);
    })

    return (
        <Base>
            <div className="header bg-dark pb-6">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-center py-4">
                            <div className="col-lg-6 col-7">
                                <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                                    <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                        <li className="breadcrumb-item">Alumni Details</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-md-6 col-5 text-right">
                                <div className="row">
                                    <div className="col-md-6 offset-md-4">
                                        <select className="form-control" value={department} onChange={handleChange("department")}>
                                            <option selected>***Select Department</option>
                                            <option value="HR">Human Resource</option>
                                            <option value="IT">Information Technology</option>
                                            <option value="MANUFACTURING">Manufacturing</option>
                                            <option value="MACHINERIES">Machineries</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <button className="btn btn-sm btn-success" onClick={OnSubmit}>Get Data</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt--6">
                <div className="card bg-default shadow">
                    <div className="card-header bg-transparent border-0">
                        <div className="row">
                            <div className="col-md-6">
                                <h3 className="text-white mb-0">Alumni Data</h3>
                            </div>
                            <div className="col-md-6 text-right">
                                <input className="alumniinputfield" type="text" placeholder="Search by Email" value={alumniSearch} onChange={searchHandler("alumniSearch")} />
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <div className="table align-items-center table-dark table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Factory</th>
                                    <th>Department</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                {loadingmsg()}
                                {
                                    filteralumni.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{data.name}</td>
                                                <td>{data.email}</td>
                                                <td>{data.factory}</td>
                                                <td>{data.department}</td>
                                      
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default AlumniIndex;
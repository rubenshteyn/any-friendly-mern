import React, {useState, useContext, useCallback, useEffect} from 'react';
import './ChangeAnimal.scss'
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";

function ChangeAnimal({isVisible = false, title, onClose, animal}) {
    console.log(animal)
    const keydownHandler = ({key}) => {
        switch (key) {
            case 'Escape':
                onClose();
                break;
            default:
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        return () => document.removeEventListener('keydown', keydownHandler);
    });

    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [kind, setKind] = useState('')
    const [vaccinations, setVaccinations] = useState('')
    const [img, setImg] = useState('')
    const {userId, role} = useContext(AuthContext)
    const [animals, setAnimals] = useState([])

    // const onChangeHandler = e => {
    //     animalEdit = ({
    //         userId: animal.userId,
    //         name: e.target.value,
    //         text: e.target.value,
    //         gender: e.target.value,
    //         age: e.target.value,
    //         kind: e.target.value,
    //         vaccinations: e.target.value,
    //         img: e.target.value,
    //     });
    //     console.log(animalEdit)
    //     return animalEdit
    // };


    // const removeAnimal = useCallback(async (id) => {
    //     try {
    //         await axios.delete(`/api/animal/delete/${id}`, {id}, {
    //             headers: {'Content-Type': 'application/json'}
    //         }).then(() => getAnimal())
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }, [getAnimal])
    const editAnimal = useCallback(async (id) => {
        try {
            await axios.post(`/api/animal/change/${id}`, {text, userId, name, gender, age, kind, vaccinations, img}, {
                headers: {'Content-Type': 'application/json'}
            }).then((response) => {
                setAnimals([...animals], response.data)
                setText('')
                setName('')
                setGender('')
                setKind('')
                setVaccinations('')
                setAge('')
                setImg('')
                onClose()
            })
        } catch (e) {
            console.log(e)
        }
    }, [animals, text, userId, name, gender, age, kind, vaccinations, img])

    return !isVisible ? null : (
        <div className="modal">
            <div className="modal-dialog" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">{title}</h4>
                    <span onClick={onClose}
                          className="waves-effect waves-light dark modal-close">
                        <i className="material-icons">close</i>
                    </span>
                </div>
                <div className="modal-body">
                    <div className="modal-content">
                        <form className="form form-login" onSubmit={e => e.preventDefault()}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <span className="radio-label">??????:</span>
                                    <div className="radio-buttons">
                                        <p>
                                            <label>
                                                <input value="cat" checked={animal.kind === "cat"} className="validate"
                                                       onChange={e => setKind(e.target.value)} name="kind"
                                                       type="radio"/>
                                                <span>??????</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input value="dog" checked={animal.kind === "dog"} className="validate"
                                                       onChange={e => setKind(e.target.value)} name="kind"
                                                       type="radio"/>
                                                <span>????????????</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>

                                <div className="input-field col s12">
                                    <span className="radio-label">??????:</span>
                                    <div className="radio-buttons">
                                        <p>
                                            <label>
                                                <input value={0} checked={animal.gender === 0} className="validate"
                                                       onChange={e => setGender(e.target.value)} name="gender"
                                                       type="radio"/>
                                                <span>??????????????</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input value={1} checked={animal.gender === 1} className="validate"
                                                       onChange={e => setGender(e.target.value)} name="gender"
                                                       type="radio"/>
                                                <span>??????????????</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>

                                <div className="input-field col s12">
                                    <span className="radio-label">?????????????? ????????????????????:</span>
                                    <div className="radio-buttons">
                                        <p>
                                            <label>
                                                <input value={true} checked={animal.vaccinations === true} className="validate"
                                                       onChange={e => setVaccinations(e.target.value)}
                                                       name="vaccinations" type="radio"/>
                                                <span>????????</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input value={false} checked={animal.vaccinations === false} className="validate"
                                                       onChange={e => setVaccinations(e.target.value)}
                                                       name="vaccinations" type="radio"/>
                                                <span>??????</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>

                                <div className="input-field col s12 text-input">
                                    <input
                                        type="text"
                                        id="name"
                                        name="input-name"
                                        className="validate"
                                        value={animal.name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                    <label htmlFor="input-name">??????:</label>
                                </div>

                                <div className="input-field col s12 text-input">
                                    <input
                                        type="text"
                                        id="age"
                                        name="input-age"
                                        className="validate"
                                        value={animal.age}
                                        onChange={e => setAge(e.target.value)}
                                    />
                                    <label htmlFor="input">??????????????:</label>
                                </div>

                                <div className="input-field col s12 text-input">
                                    <input
                                        type="text"
                                        id="text"
                                        name="input-text"
                                        className="validate"
                                        value={animal.text}
                                        onChange={e => setText(e.target.value)}
                                    />
                                    <label htmlFor="input-text">????????????????:</label>
                                </div>

                                <div className="input-field col s12 text-input">
                                    <input
                                        type="text"
                                        id="img"
                                        name="input-img"
                                        className="validate"
                                        value={animal.img}
                                        onChange={e => setImg(e.target.value)}
                                    />
                                    <label htmlFor="input-img">???????????? ???? ??????????????????????:</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="row">
                        <button onClick={editAnimal(animal._id)} className="waves-effect add waves-light btn orange">
                            ????????????????
                        </button>
                        <button onClick={onClose} className="waves-effect waves-light btn red">????????????</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangeAnimal;
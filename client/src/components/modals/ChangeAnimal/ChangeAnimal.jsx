import React, {useState, useContext, useCallback} from 'react';
import './ChangeAnimal.scss'
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";

function ChangeAnimal({isVisible = false, title, animal, onClose}) {
    console.log(animal)
    // const keydownHandler = ({key}) => {
    //     switch (key) {
    //         case 'Escape':
    //             onClose();
    //             break;
    //         default:
    //     }
    // };
    //
    // React.useEffect(() => {
    //     document.addEventListener('keydown', keydownHandler);
    //     return () => document.removeEventListener('keydown', keydownHandler);
    // });
    const [currentAnimal, setAnimal] = useState(animal)
    console.log(currentAnimal)
    const viewCurrentData = () => {

    }
    const onCloseInModal = () => {
        setAnimal({})
        onClose()
    }
    // const editAnimal = useCallback(async (id) => {
    //     try {
    //         console.log(text, userId)
    //         await axios.post(`/api/animal/change/${id}`, {text, userId, name, gender, age, kind, vaccinations, img}, {
    //             headers: {'Content-Type': 'application/json'}
    //         }).then((response) => {
    //             setAnimal([...animal])
    //             onClose()
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }, [animals, text, userId, name, gender, age, kind, vaccinations, img])

    return !isVisible ? null : (
        <div className="modal">
            <div className="modal-dialog" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">{title}</h4>
                    <span onClick={onCloseInModal}
                          className="waves-effect waves-light dark modal-close">
                        <i className="material-icons">close</i>
                    </span>
                </div>
                <div className="modal-body">
                    <div className="modal-content">
                        <form className="form form-login" onSubmit={e => e.preventDefault()}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <span className="radio-label">Вид:</span>
                                    <div className="radio-buttons">
                                        <p>
                                            <label>
                                                <input
                                                    onChange={e => setAnimal({...animal, kind: e.target.value})}
                                                    value="cat" checked={currentAnimal.kind === "cat"} className="validate"
                                                       name="kind"
                                                       type="radio"/>
                                                <span>Кот</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input
                                                    onChange={e => setAnimal({...animal, kind: e.target.value})}
                                                    value="dog" checked={currentAnimal.kind === "dog"} className="validate"
                                                       name="kind"
                                                       type="radio"/>
                                                <span>Собака</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>

                                {/*<div className="input-field col s12">*/}
                                {/*    <span className="radio-label">Пол:</span>*/}
                                {/*    <div className="radio-buttons">*/}
                                {/*        <p>*/}
                                {/*            <label>*/}
                                {/*                <input value={0} checked={gender === 0} className="validate"*/}
                                {/*                       onChange={e => setGender(e.target.value)} name="gender"*/}
                                {/*                       type="radio"/>*/}
                                {/*                <span>Девочка</span>*/}
                                {/*            </label>*/}
                                {/*        </p>*/}
                                {/*        <p>*/}
                                {/*            <label>*/}
                                {/*                <input value={1} checked={gender === 1} className="validate"*/}
                                {/*                       onChange={e => setGender(e.target.value)} name="gender"*/}
                                {/*                       type="radio"/>*/}
                                {/*                <span>Мальчик</span>*/}
                                {/*            </label>*/}
                                {/*        </p>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/*<div className="input-field col s12">*/}
                                {/*    <span className="radio-label">Наличие вакцинаций:</span>*/}
                                {/*    <div className="radio-buttons">*/}
                                {/*        <p>*/}
                                {/*            <label>*/}
                                {/*                <input value={true} checked={vaccinations === true} className="validate"*/}
                                {/*                       onChange={e => setVaccinations(e.target.value)}*/}
                                {/*                       name="vaccinations" type="radio"/>*/}
                                {/*                <span>Есть</span>*/}
                                {/*            </label>*/}
                                {/*        </p>*/}
                                {/*        <p>*/}
                                {/*            <label>*/}
                                {/*                <input value={false} checked={vaccinations === false} className="validate"*/}
                                {/*                       onChange={e => setVaccinations(e.target.value)}*/}
                                {/*                       name="vaccinations" type="radio"/>*/}
                                {/*                <span>Нет</span>*/}
                                {/*            </label>*/}
                                {/*        </p>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/*<div className="input-field col s12 text-input">*/}
                                {/*    <input*/}
                                {/*        type="text"*/}
                                {/*        id="name"*/}
                                {/*        name="input-name"*/}
                                {/*        className="validate"*/}
                                {/*        value={name}*/}
                                {/*        onChange={e => setName(e.target.value)}*/}
                                {/*    />*/}
                                {/*    <label htmlFor="input-name">Имя:</label>*/}
                                {/*</div>*/}

                                {/*<div className="input-field col s12 text-input">*/}
                                {/*    <input*/}
                                {/*        type="text"*/}
                                {/*        id="age"*/}
                                {/*        name="input-age"*/}
                                {/*        className="validate"*/}
                                {/*        value={age}*/}
                                {/*        onChange={e => setAge(e.target.value)}*/}
                                {/*    />*/}
                                {/*    <label htmlFor="input">Возраст:</label>*/}
                                {/*</div>*/}

                                {/*<div className="input-field col s12 text-input">*/}
                                {/*    <input*/}
                                {/*        type="text"*/}
                                {/*        id="text"*/}
                                {/*        name="input-text"*/}
                                {/*        className="validate"*/}
                                {/*        value={text}*/}
                                {/*        onChange={e => setText(e.target.value)}*/}
                                {/*    />*/}
                                {/*    <label htmlFor="input-text">Описание:</label>*/}
                                {/*</div>*/}

                                {/*<div className="input-field col s12 text-input">*/}
                                {/*    <input*/}
                                {/*        type="text"*/}
                                {/*        id="img"*/}
                                {/*        name="input-img"*/}
                                {/*        className="validate"*/}
                                {/*        value={img}*/}
                                {/*        onChange={e => setImg(e.target.value)}*/}
                                {/*    />*/}
                                {/*    <label htmlFor="input-img">Ссылка на изображение:</label>*/}
                                {/*</div>*/}
                            </div>
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="row">
                        {/*<button onClick={editAnimal} className="waves-effect add waves-light btn orange">*/}
                        {/*    Добавить*/}
                        {/*</button>*/}
                        <button onClick={onClose} className="waves-effect waves-light btn red">Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangeAnimal;
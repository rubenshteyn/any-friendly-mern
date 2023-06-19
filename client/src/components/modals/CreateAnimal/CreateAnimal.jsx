import React, {useState, useContext, useCallback, useEffect} from 'react';
import './CreateAnimal.scss'
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import MyInput from "../../UI/MyInput/MyInput";
import MyButton from "../../UI/MyButton/MyButton";
import MyRadio from "../../UI/MyRadio/MyRadio";

function CreateAnimal({isVisible = false, title, onClose}) {

    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [kind, setKind] = useState('')
    const [vaccinations, setVaccinations] = useState('')
    const [img, setImg] = useState('')
    const {userId, role} = useContext(AuthContext)
    const [animals, setAnimals] = useState([])

    const getAnimal = useCallback(async () => {
        try {
            await axios.get('/api/animal', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId, role}
            })
                .then((response) => setAnimals(response.data))
        } catch (e) {
            console.log(e)
        }
    }, [userId, role])

    const createAnimal = useCallback(async () => {
        if (!text) return null
        try {
            await axios.post('/api/animal/add', {text, userId, name, gender, age, kind, vaccinations, img}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    setAnimals([...animals], response.data)
                    setText('')
                    setName('')
                    setGender('')
                    setKind('')
                    setVaccinations('')
                    setAge('')
                    setImg('')
                    getAnimal()
                    onClose()
                })
        } catch (e) {
            console.log(e)
        }
    }, [text, userId, name, img, gender, age, kind, vaccinations, animals, getAnimal])

    useEffect(() => {
        getAnimal()
    }, [animals])

    return !isVisible ? null : (
        <div onLoad={getAnimal} className="modal">
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

                                <MyRadio
                                    labelName="Вид:"
                                    setValue={setKind}
                                    firstValue="cat"
                                    secondValue="dog"
                                    firstText="Кот"
                                    secondText="Собака"
                                    type="radio"
                                    name="kind"
                                />

                                <MyRadio
                                    labelName="Пол:"
                                    setValue={setGender}
                                    firstValue={0}
                                    secondValue={1}
                                    firstText="Девочка"
                                    secondText="Мальчик"
                                    type="radio"
                                    name="gender"
                                />

                                <MyRadio
                                    labelName="Наличие вакцинаций:"
                                    setValue={setVaccinations}
                                    firstValue={true}
                                    secondValue={false}
                                    firstText="Есть"
                                    secondText="Нет"
                                    type="radio"
                                    name="vaccinations"
                                />

                                <MyInput
                                    type="text"
                                    id="name"
                                    name="input-name"
                                    className="validate"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    labelName="Имя:"
                                />

                                <MyInput
                                    type="text"
                                    id="age"
                                    name="input-age"
                                    className="validate"
                                    value={age}
                                    onChange={e => setAge(e.target.value)}
                                    labelName="Возраст:"
                                />

                                <MyInput
                                    type="text"
                                    id="text"
                                    name="input-text"
                                    className="validate"
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    labelName="Описание:"
                                />

                                <MyInput
                                    type="text"
                                    id="img"
                                    name="input-img"
                                    className="validate"
                                    value={img}
                                    onChange={e => setImg(e.target.value)}
                                    labelName="Ссылка на изображение:"
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="row">
                        <MyButton onClick={createAnimal} className="waves-effect add waves-light btn orange">
                            Добавить
                        </MyButton>
                        <button onClick={onClose} className="waves-effect waves-light btn red">Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateAnimal;
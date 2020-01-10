import React, {Component} from 'react'
import {Button} from '../../components/Ui/Button/Button'
import {Input} from '../../components/Ui/Input/Input'
import {createControl, onChangeHandler} from '../../form/formFrameWork'
import {Select} from '../../components/Ui/Select/Select'
import classes from './QuizCreator.module.css'

function createOptionControl(id) {
    return createControl({
        label: `Вариант ${id}`,
        errorMessage: 'Значение не может быть пустым',
        id
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым',
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),

    }
}

export default class QuizCreator extends Component {
    constructor (props) {
        super(props)


        this.onChangeHandler = onChangeHandler.bind(this)
    }

    state = {
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }

    addQuestionHandler = (params) => {

    }

    createQuizHandler = (params) => {

    }

    selectChangeHandler = event => this.setState({rightAnswerId: +event.target.value})


    renderControls = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            const {value, type, label, errorMessage, valid, touched, validation} = control

            return <React.Fragment key={controlName + index}>
                <Input
                    type={type}
                    label={label}
                    value={value}
                    valid={valid}
                    touched={touched}
                    shouldValidate={!!validation}
                    errorMessage={errorMessage}
                    onChange={event => this.onChangeHandler(event.target.value, controlName)}
                />
                {index === 0 && <hr />}
            </ React.Fragment>
        })
    }


    render() {
        const select = <Select
            label="Выберите правильный ответ"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form
                        className={classes.QuizCreatorForm}
                        onSubmit={event => event.preventDefault()}
                    >
                        {this.renderControls()}
                        {select}
                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={this.state.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

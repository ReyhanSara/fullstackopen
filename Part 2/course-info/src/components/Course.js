import React from 'react';

const Header = ({ header }) => {
    return (
        <h2>{header}</h2>
    )
}
const Total = ({ total }) => {
    var tot = total.reduce((sum, total) => sum + total.exercises, 0)
    return (
        <p>total of {tot} exercises</p>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ content }) => {
    return (
        <div>
            {content.map(lesson =>
                <Part key={lesson.id} part={lesson} />
            )}
            <Total total={content} />
        </div>
    )
}
const Course = ({ course }) => {
    return (
        <div>
            <Header header={course.name} />
            <Content content={course.parts} />
        </div>
    )
}

export default Course
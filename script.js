const btn = document.querySelector('.solve')
const rst = document.querySelector('.reset')
const inputs = document.querySelectorAll('.input')
const err = document.querySelector('.error')

let darkCol = [
    3, 4, 5,
    12, 13, 14,
    21, 22, 23,
    27, 28, 29, 33, 34, 35,
    36, 37, 38, 42, 43, 44,
    45, 46, 47, 51, 52, 53,
    57, 58, 59,
    66, 67, 68,
    75, 76, 77
]


inputs.forEach((Element) => {
    Element.setAttribute('min', '1')
    Element.setAttribute('max', '9')
})

// function input() {
//     let inputSudoku = [
//         [0, 9, 2, 0, 5, 0, 3, 0, 0],
//         [0, 4, 3, 0, 2, 0, 1, 0, 0],
//         [0, 5, 0, 3, 9, 0, 0, 2, 4],
//         [2, 6, 5, 0, 0, 3, 8, 0, 0],
//         [4, 0, 0, 0, 0, 1, 0, 0, 3],
//         [0, 0, 7, 4, 0, 2, 0, 0, 0],
//         [0, 0, 0, 7, 4, 0, 5, 0, 0],
//         [9, 0, 0, 2, 0, 5, 6, 0, 0],
//         [5, 2, 0, 0, 3, 0, 0, 0, 7],
//     ]
//     for (let row = 0; row < 9; row++) {
//         for (let col = 0; col < 9; col++) {
//             if (inputSudoku[row][col] != 0) {
//                 document.querySelector('.r' + (row + 1) + ' .c' + (col + 1)).value = inputSudoku[row][col]
//             }
//         }
//     }
// }
// input()

resetColor()

function resetColor() {
    let i = 0
    inputs.forEach((Element) => {
        if (darkCol.includes(i)) {
            Element.style.backgroundColor = "#ADADAD"
        }
        else {
            Element.style.backgroundColor = "white"
        }
        i++
    })
    document.querySelector('.error').style.visibility = 'hidden'
}

function solve() {

    const sudoku = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    for (let row = 1; row < 10; row++) {
        for (let col = 1; col < 10; col++) {
            let cls = '.r' + row + ' .c' + col
            let cell = document.querySelector(cls)
            cell.setAttribute('onclick', 'resetColor()')
            let val = parseInt(cell.value)
            if (val || val == 0) {
                if (0 < val && val < 10 && possible(row - 1, col - 1, val)) {
                    sudoku[row - 1][col - 1] = val
                }
                else {
                    err.style.visibility = 'visible'
                    cell.style.backgroundColor = 'red'
                    err.innerText = 'Invalid Input'
                    return
                }
            }
        }
    }

    function possible(y, x, n) {
        for (let i = 0; i < 9; i++)
            if (sudoku[y][i] == n)
                return false
        for (let i = 0; i < 9; i++)
            if (sudoku[i][x] == n)
                return false
        let x0 = Math.floor(x / 3) * 3
        let y0 = Math.floor(y / 3) * 3
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (sudoku[y0 + i][x0 + j] == n)
                    return false
        return true
    }

    let ans = null
    function solveSudoku() {

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (sudoku[i][j] == 0) {
                    for (let k = 1; k < 10; k++) {
                        if (possible(i, j, k)) {
                            sudoku[i][j] = k;
                            solveSudoku();
                            sudoku[i][j] = 0;
                        }
                    }
                    return
                }
            }
        }
        ans = 'ans:' + sudoku
    }

    solveSudoku()
    if (ans == null) {
        err.innerText = 'Answer not possible'
        return
    }
    ans = ans.slice(4, ans.length).split(',')

    let ans2 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    let r = 0
    let c = 0
    for (let i = 0; i < ans.length; i++) {
        if (c == 9) {
            r++
            c = 0
        }
        ans2[r][c] = parseInt(ans[i])
        c++
    }

    for (let row = 1; row < 10; row++) {
        for (let col = 1; col < 10; col++) {
            let cls = '.r' + row + ' .c' + col
            let ele = document.querySelector(cls)
            ele.value = ans2[row - 1][col - 1]
            if (sudoku[row - 1][col - 1] == 0) {
                ele.style.color = 'green'
                ele.style.fontWeight = 'bolder'
                ele.style.animation = 'animate 1s linear'
            }
        }
    }
}

btn.addEventListener('click', solve)
rst.addEventListener('click', () => location.reload())
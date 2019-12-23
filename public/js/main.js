const getSort = ({ target }) => {
    const order = (target.dataset.order = -(target.dataset.order || -1));
    const index = [...target.parentNode.cells].indexOf(target);
    const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
    const comparator = (index, order) => (a, b) => order * collator.compare(
        a.children[index].innerHTML,
        b.children[index].innerHTML
    );
    
    for(const tBody of target.closest('table').tBodies)
        tBody.append(...[...tBody.rows].sort(comparator(index, order)));

    for(const cell of target.parentNode.cells)
        cell.classList.toggle('sorted', cell === target);
};

document.querySelectorAll('.table_sort thead')
    .forEach(th => 
        th.addEventListener('click', () => getSort(event)));

var labels = [];
var data = [];
var labelsCount = document.querySelectorAll('.collection-item').length;
for (let i = 1; i <= labelsCount; i++) {
    labels.push(i);  
}
data = document.querySelectorAll('.average')
data = [...data]
data = data.map(function(d){
    return parseFloat(d.innerHTML)
})
new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
        labels,
        datasets: [{ 
            data,
            label: "Середня оцінка",
            borderColor: "#22ee44",
            fill: false
        }, 
        ]
    },
    options: {
        title: {
        display: true,
        text: 'Графік успішності'
        }
    }
    });        
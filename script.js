// ======== 获取所有灯泡和控制元素 ========
const bulbs = document.querySelectorAll('.bulb');
const modeDisplay = document.getElementById('modeDisplay');
let intervalId = null;      // 用来存放定时器的编号
let isFlashing = false;     // 记录当前是否在跑流水灯

// ======== 核心函数：更新单个灯泡的外观 ========
function updateBulb(bulb) {
    if (bulb.classList.contains('on')) {
        const color = bulb.dataset.color;
        bulb.style.backgroundColor = color;
        bulb.style.color = color;
    } else {
        bulb.style.backgroundColor = '#333';
        bulb.style.color = '';
    }
}

// ======== 初始化：所有灯泡默认熄灭 ========
bulbs.forEach(b => {
    b.classList.remove('on');
    updateBulb(b);
});

// ======== 1. 点击单个灯泡（手动切换） ========
bulbs.forEach(bulb => {
    bulb.addEventListener('click', function() {
        if (isFlashing) {
            alert('请先点击“流水模式”按钮关闭流水灯，再手动操作！');
            return;
        }
        this.classList.toggle('on');
        updateBulb(this);
    });
});

// ======== 2. 全部点亮 ========
document.getElementById('btn-all-on').addEventListener('click', function() {
    if (isFlashing) {
        alert('请先关闭流水模式！');
        return;
    }
    bulbs.forEach(b => {
        b.classList.add('on');
        updateBulb(b);
    });
});

// ======== 3. 全部熄灭 ========
document.getElementById('btn-all-off').addEventListener('click', function() {
    // 如果流水灯正在跑，强制关掉
    if (isFlashing) {
        clearInterval(intervalId);
        intervalId = null;
        isFlashing = false;
        modeDisplay.textContent = '静态';
    }
    bulbs.forEach(b => {
        b.classList.remove('on');
        updateBulb(b);
    });
});

// ======== 4. 随机点亮 ========
document.getElementById('btn-random').addEventListener('click', function() {
    if (isFlashing) {
        alert('请先关闭流水模式！');
        return;
    }
    // 先全部熄灭，再随机点亮一半左右的灯泡
    bulbs.forEach(b => {
        b.classList.remove('on');
        updateBulb(b);
    });
    // 随机选择一半灯泡点亮
    bulbs.forEach(b => {
        if (Math.random() > 0.5) {  // 50%的概率点亮
            b.classList.add('on');
            updateBulb(b);
        }
    });
});

// ======== 5. 流水模式（核心！） ========
document.getElementById('btn-mode').addEventListener('click', function() {
    // 如果正在流水，点击就停止
    if (isFlashing) {
        clearInterval(intervalId);
        intervalId = null;
        isFlashing = false;
        modeDisplay.textContent = '静态';
        // 停止后把所有灯点亮（看着整齐）
        bulbs.forEach(b => {
            b.classList.add('on');
            updateBulb(b);
        });
        return;
    }

    // 开启流水模式
    isFlashing = true;
    modeDisplay.textContent = '流水模式 🌊';

    // 先全部熄灭
    bulbs.forEach(b => {
        b.classList.remove('on');
        updateBulb(b);
    });

    let index = 0;
    intervalId = setInterval(() => {
        // 每次先把所有灯熄灭
        bulbs.forEach(b => {
            b.classList.remove('on');
            updateBulb(b);
        });
        // 只点亮当前索引的那一个灯泡
        bulbs[index].classList.add('on');
        updateBulb(bulbs[index]);

        // 索引向后移动，到头了就回到第一个
        index++;
        if (index >= bulbs.length) {
            index = 0;
        }
    }, 400); // 400毫秒跳一次，你可以改成 200 或 800
});
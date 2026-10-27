/* ============================================================
 *  星海拾贝 · 游戏主逻辑
 *  数据来源：data/data.js（window.MESSIER_DATA / window.CUSTOM_ICONS）
 * ============================================================ */

/* --- 自定义配图配置（数据在 data/data.js 中维护） --- */
const CUSTOM_ICONS = window.CUSTOM_ICONS || {};

window.addEventListener('DOMContentLoaded', () => {
    if (CUSTOM_ICONS.imageToKnowledge) {
        const c1 = document.getElementById('icon-container-1');
        c1.innerHTML = `<img src="${CUSTOM_ICONS.imageToKnowledge}" class="w-full h-full object-cover rounded-2xl" alt="看图识星">`;
        c1.classList.remove('p-4'); // 如果存在内边距，移除以适应全幅图片
    }
    if (CUSTOM_ICONS.nameToImage) {
        const c2 = document.getElementById('icon-container-2');
        c2.innerHTML = `<img src="${CUSTOM_ICONS.nameToImage}" class="w-full h-full object-cover rounded-2xl" alt="寻星索骥">`;
        c2.classList.remove('p-4');
    }
    if (CUSTOM_ICONS.flashcards) {
        const c3 = document.getElementById('icon-container-3');
        c3.innerHTML = `<img src="${CUSTOM_ICONS.flashcards}" class="w-full h-full object-cover rounded-2xl" alt="星空闪卡">`;
        c3.classList.remove('p-4');
    }
});

/* --- 动态星空画布逻辑 --- */
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let width, height;
let stars = [];

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function initStars() {
    stars = [];
    const numStars = Math.floor((width * height) / 4000); // 根据屏幕大小决定星星数量
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.1,
            speed: Math.random() * 0.1 + 0.02, // 缓慢自东向西（右向左）移动速度
            opacity: Math.random(),
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            twinkleDir: Math.random() > 0.5 ? 1 : -1
        });
    }
}

function drawStars() {
    // 深邃宇宙底色
    ctx.fillStyle = '#04050a';
    ctx.fillRect(0, 0, width, height);

    // 绘制星云氛围 (大范围柔和渐变)
    const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height));
    gradient.addColorStop(0, 'rgba(20, 24, 44, 0.4)');
    gradient.addColorStop(0.5, 'rgba(10, 12, 24, 0.2)');
    gradient.addColorStop(1, 'rgba(4, 5, 10, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    stars.forEach(star => {
        // 自东向西移动
        star.x -= star.speed;

        // 移出左侧边界后从右侧重新出现
        if (star.x < 0) {
            star.x = width;
            star.y = Math.random() * height; // 高度重新随机，避免成排
        }

        // 闪烁逻辑
        star.opacity += star.twinkleSpeed * star.twinkleDir;
        if (star.opacity >= 1) {
            star.opacity = 1;
            star.twinkleDir = -1;
        } else if (star.opacity <= 0.1) {
            star.opacity = 0.1;
            star.twinkleDir = 1;
        }

        // 绘制星星主体
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // 更亮的星星带有极微弱的光晕
        if(star.radius > 1.2 && star.opacity > 0.6) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.2})`;
            ctx.fill();
        }
    });

    requestAnimationFrame(drawStars);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initStars();
});

resizeCanvas();
initStars();
drawStars();

/* --- M天体数据源（data/data.js） --- */
const messierData = window.MESSIER_DATA || [];

// 状态变量
let currentMode = '';
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;

const QUESTIONS_PER_ROUND = 10;

const elMainMenu = document.getElementById('main-menu');
const elQuizContainer = document.getElementById('quiz-container');
const elResultScreen = document.getElementById('result-screen');
const elContentArea = document.getElementById('content-area');
const elProgressIndicator = document.getElementById('progress-indicator');

// 纯随机洗牌算法 (Fisher-Yates) - 确保题目和选项每次都是完全随机的
function shuffleArray(array) {
    const arr = [...array]; // 创建副本，确保不修改原数组引用
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function generateOptions(correctItem) {
    // 剔除正确答案，剩下的打乱
    let availableItems = messierData.filter(item => item.id !== correctItem.id);
    let shuffledAvailable = shuffleArray(availableItems);

    let options = [correctItem];
    // 纯随机挑选3个干扰项
    for(let i=0; i<3; i++) {
        options.push(shuffledAvailable[i]);
    }
    // 最终对这4个选项再次进行纯随机排序，确保正确答案位置每次都随机
    return shuffleArray(options);
}

function generateQuestions(mode) {
    // 对所有题库进行纯随机打乱，抽取前N题
    let shuffledData = shuffleArray(messierData);
    let limit = mode === 'flashcards' ? messierData.length : QUESTIONS_PER_ROUND;
    let selectedItems = shuffledData.slice(0, limit);

    return selectedItems.map(item => {
        return {
            correct: item,
            options: generateOptions(item)
        };
    });
}

function showScreen(screenId) {
    elMainMenu.classList.add('hidden');
    elQuizContainer.classList.add('hidden');
    elResultScreen.classList.add('hidden');

    const target = document.getElementById(screenId);
    target.classList.remove('hidden');

    // 根据当前页面是否为主菜单，决定是否显示顶部标题，隐藏标题后有效节约纵向空间
    const header = document.getElementById('main-header');
    if (screenId === 'main-menu') {
        header.classList.remove('hidden');
    } else {
        header.classList.add('hidden');
    }

    // 重新触发动画
    target.classList.remove('animate-fade-in');
    void target.offsetWidth;
    target.classList.add('animate-fade-in');
}

function returnToMenu() {
    showScreen('main-menu');
}

function startMode(mode) {
    currentMode = mode;
    quizQuestions = generateQuestions(mode);
    currentQuestionIndex = 0;
    score = 0;

    showScreen('quiz-container');
    renderCurrentView();
}

function retryCurrentMode() {
    startMode(currentMode);
}

function renderCurrentView() {
    hasAnswered = false;
    let q = quizQuestions[currentQuestionIndex];

    if (currentMode === 'imageToKnowledge') {
        renderImageToKnowledge(q);
    } else if (currentMode === 'nameToImage') {
        renderNameToImage(q);
    } else if (currentMode === 'flashcards') {
        renderFlashcard(q);
    }

    // 更新进度条
    if (currentMode === 'flashcards') {
        elProgressIndicator.innerText = `${currentQuestionIndex + 1} / ${quizQuestions.length}`;
    } else {
        elProgressIndicator.innerText = `${currentQuestionIndex + 1} / ${QUESTIONS_PER_ROUND}`;
    }
}

function renderImageToKnowledge(q) {
    let html = `
                <div class="flex flex-col items-center w-full">
                    <div class="flex items-center gap-2 mb-6">
                        <i class="ph-duotone ph-camera text-2xl text-blue-400"></i>
                        <h3 class="text-2xl font-medium text-white tracking-wide">请识别该深空天体</h3>
                    </div>
                    <div class="w-full max-w-md h-72 mb-8 rounded-2xl overflow-hidden border border-gray-600/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative">
                        <img src="${q.correct.url}" alt="Mystery Object" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full" id="options-container">
                        ${q.options.map((opt) => `
                            <button onclick="checkAnswer('${opt.id}', this)" class="option-btn border border-gray-600/40 bg-gray-800/60 rounded-xl p-5 text-center flex flex-col items-center justify-center backdrop-blur-md">
                                <span class="font-black text-xl text-white mb-1">${opt.id}</span>
                                <span class="text-sm text-gray-400">${opt.name}</span>
                            </button>
                        `).join('')}
                    </div>

                    <div id="feedback-area" class="w-full mt-8 hidden">
                        <div class="p-6 rounded-2xl bg-gray-800/80 border border-gray-600/50 backdrop-blur-lg shadow-xl relative overflow-hidden">
                            <div class="absolute top-0 left-0 w-1 h-full bg-blue-500" id="feedback-accent"></div>
                            <h4 class="text-2xl font-bold mb-4 flex items-center gap-3">
                                <span id="feedback-icon" class="text-3xl"></span>
                                <span class="text-white">${q.correct.id} - ${q.correct.name}</span>
                            </h4>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-300 mb-4 bg-gray-900/50 p-4 rounded-xl">
                                <p><span class="text-gray-500 block text-xs mb-1">种类</span><span class="font-medium">${q.correct.type}</span></p>
                                <p><span class="text-gray-500 block text-xs mb-1">星座</span><span class="font-medium">${q.correct.const}</span></p>
                                <p><span class="text-gray-500 block text-xs mb-1">视星等</span><span class="font-medium">${q.correct.mag}</span></p>
                            </div>
                            <p class="text-gray-300 leading-relaxed text-sm">${q.correct.info}</p>
                        </div>
                        <button onclick="nextQuestion()" class="mt-6 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(79,70,229,0.4)] flex justify-center items-center gap-2">
                            ${currentQuestionIndex < QUESTIONS_PER_ROUND - 1 ? '继续探索 <i class="ph-bold ph-arrow-right"></i>' : '查看航行报告 <i class="ph-bold ph-flag-checkered"></i>'}
                        </button>
                    </div>
                </div>
            `;
    elContentArea.innerHTML = html;
}

function renderNameToImage(q) {
    let html = `
                <div class="flex flex-col items-center w-full">
                    <div class="flex items-center gap-2 mb-2 text-purple-400">
                        <i class="ph-duotone ph-crosshair text-xl"></i>
                        <h3 class="text-lg font-medium tracking-wide">目标定位</h3>
                    </div>
                    <h2 class="text-4xl font-extrabold mb-8 text-center text-white neon-text">${q.correct.id} <span class="text-2xl text-gray-400 ml-2 font-normal">${q.correct.name}</span></h2>

                    <div class="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl" id="options-container">
                        ${q.options.map((opt) => `
                            <button onclick="checkAnswer('${opt.id}', this)" class="option-btn border-2 border-gray-600/30 rounded-2xl overflow-hidden aspect-[4/3] relative group bg-black">
                                <img src="${opt.url}" alt="Option" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                    <span class="text-white font-bold tracking-widest text-sm bg-black/60 px-4 py-1.5 rounded-full border border-gray-500/50 backdrop-blur-sm">锁定目标</span>
                                </div>
                            </button>
                        `).join('')}
                    </div>

                    <div id="feedback-area" class="w-full mt-8 hidden max-w-2xl">
                        <div class="p-6 rounded-2xl bg-gray-800/80 border border-gray-600/50 backdrop-blur-lg shadow-xl relative overflow-hidden">
                            <div class="absolute top-0 left-0 w-1 h-full bg-purple-500" id="feedback-accent"></div>
                            <h4 class="text-2xl font-bold mb-4 flex items-center gap-3">
                                <span id="feedback-icon" class="text-3xl"></span>
                                <span class="text-white">天体数据解密</span>
                            </h4>
                            <div class="flex flex-wrap gap-4 text-sm text-gray-300 mb-4 bg-gray-900/50 p-4 rounded-xl">
                                <span class="bg-gray-800 px-3 py-1 rounded-md border border-gray-700"><strong>种类:</strong> ${q.correct.type}</span>
                                <span class="bg-gray-800 px-3 py-1 rounded-md border border-gray-700"><strong>星座:</strong> ${q.correct.const}</span>
                            </div>
                            <p class="text-gray-300 leading-relaxed text-sm">${q.correct.info}</p>
                        </div>
                        <button onclick="nextQuestion()" class="mt-6 w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] flex justify-center items-center gap-2">
                            ${currentQuestionIndex < QUESTIONS_PER_ROUND - 1 ? '继续探索 <i class="ph-bold ph-arrow-right"></i>' : '查看航行报告 <i class="ph-bold ph-flag-checkered"></i>'}
                        </button>
                    </div>
                </div>
            `;
    elContentArea.innerHTML = html;
}

function renderFlashcard(q) {
    let html = `
                <div class="flex flex-col items-center w-full">
                    <div class="flex items-center justify-center gap-2 mb-6 text-emerald-400">
                        <i class="ph-duotone ph-cards text-2xl"></i>
                        <p class="text-sm tracking-widest font-medium">点击翻转 探索奥秘</p>
                    </div>

                    <div class="w-full max-w-md h-[420px] flip-card cursor-pointer group" onclick="this.classList.toggle('flipped')">
                        <div class="flip-card-inner shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]">
                            <!-- 正面：图片 -->
                            <div class="flip-card-front bg-gray-900 border border-gray-600/50 overflow-hidden">
                                <img src="${q.correct.url}" alt="${q.correct.id}" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                                    <div class="flex items-center gap-2 text-emerald-400/80 mb-1 group-hover:text-emerald-300 transition-colors">
                                        <i class="ph-bold ph-arrows-left-right"></i>
                                        <span class="text-xs font-bold tracking-widest uppercase">Tap to flip</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 反面：详细知识 -->
                            <div class="flip-card-back bg-gradient-to-br from-gray-800 to-gray-900 p-8 flex flex-col justify-start items-center text-left border border-gray-600/50 relative overflow-hidden">
                                <!-- 装饰性背景图标 -->
                                <i class="ph-fill ph-planet absolute -bottom-10 -right-10 text-9xl text-gray-700/20"></i>

                                <div class="w-full text-center mb-6 z-10">
                                    <h2 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-1">${q.correct.id}</h2>
                                    <h3 class="text-xl font-medium text-white">${q.correct.name}</h3>
                                </div>

                                <div class="w-full space-y-3 mb-6 z-10">
                                    <div class="flex justify-between items-center border-b border-gray-700/50 pb-3">
                                        <span class="text-gray-400 text-sm flex items-center gap-1"><i class="ph ph-tag"></i> 分类</span>
                                        <span class="font-medium text-gray-200 text-right">${q.correct.type}</span>
                                    </div>
                                    <div class="flex justify-between items-center border-b border-gray-700/50 pb-3">
                                        <span class="text-gray-400 text-sm flex items-center gap-1"><i class="ph ph-star"></i> 星座</span>
                                        <span class="font-medium text-gray-200 text-right">${q.correct.const}</span>
                                    </div>
                                    <div class="flex justify-between items-center border-b border-gray-700/50 pb-3">
                                        <span class="text-gray-400 text-sm flex items-center gap-1"><i class="ph ph-eye"></i> 视星等</span>
                                        <span class="font-medium text-gray-200">${q.correct.mag}</span>
                                    </div>
                                </div>

                                <div class="w-full bg-black/30 p-4 rounded-xl text-sm leading-relaxed text-gray-300 overflow-y-auto z-10 border border-gray-700/50">
                                    ${q.correct.info}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-between w-full max-w-md mt-10">
                        <button onclick="prevCard()" class="px-6 py-3 bg-gray-800/80 hover:bg-gray-700 border border-gray-600/50 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2 backdrop-blur-sm" ${currentQuestionIndex === 0 ? 'disabled' : ''}>
                            <i class="ph-bold ph-caret-left"></i> 上一张
                        </button>
                        <button onclick="nextCard()" class="px-6 py-3 bg-emerald-600/90 hover:bg-emerald-500 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 backdrop-blur-sm" ${currentQuestionIndex === quizQuestions.length - 1 ? 'disabled' : ''}>
                            下一张 <i class="ph-bold ph-caret-right"></i>
                        </button>
                    </div>
                </div>
            `;
    elContentArea.innerHTML = html;
}

function checkAnswer(selectedId, btnElement) {
    if (hasAnswered) return;
    hasAnswered = true;

    let q = quizQuestions[currentQuestionIndex];
    let isCorrect = selectedId === q.correct.id;

    const accentBar = document.getElementById('feedback-accent');
    const iconEl = document.getElementById('feedback-icon');

    if (isCorrect) {
        score++;
        btnElement.classList.add('correct-answer');
        iconEl.innerHTML = '<i class="ph-fill ph-check-circle text-emerald-400"></i>';
        if(accentBar) accentBar.className = 'absolute top-0 left-0 w-1 h-full bg-emerald-500';
    } else {
        btnElement.classList.add('wrong-answer');
        iconEl.innerHTML = '<i class="ph-fill ph-x-circle text-red-400"></i>';
        if(accentBar) accentBar.className = 'absolute top-0 left-0 w-1 h-full bg-red-500';

        // 标出正确答案
        const buttons = document.querySelectorAll('#options-container button');
        buttons.forEach(b => {
            if(b.getAttribute('onclick').includes(q.correct.id)) {
                b.classList.add('correct-answer');
            }
        });
    }

    // 禁用所有按钮
    const allButtons = document.querySelectorAll('#options-container button');
    allButtons.forEach(b => {
        b.disabled = true;
        b.style.cursor = 'default';
    });

    // 显示反馈区
    const feedbackArea = document.getElementById('feedback-area');
    feedbackArea.classList.remove('hidden');
    // 重新触发动画
    void feedbackArea.offsetWidth;
    feedbackArea.classList.add('animate-slide-up');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < QUESTIONS_PER_ROUND) {
        renderCurrentView();
    } else {
        showResults();
    }
}

function nextCard() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        renderCurrentView();
    }
}

function prevCard() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderCurrentView();
    }
}

function showResults() {
    showScreen('result-screen');

    // 滚动数字动画效果
    let currentScore = 0;
    const scoreEl = document.getElementById('final-score');
    document.getElementById('total-questions').innerText = QUESTIONS_PER_ROUND;

    const timer = setInterval(() => {
        if(currentScore >= score) {
            clearInterval(timer);
            scoreEl.innerText = score;
        } else {
            currentScore++;
            scoreEl.innerText = currentScore;
        }
    }, 50); // 简单的数字增长动画

    let message = "";
    let ratio = score / QUESTIONS_PER_ROUND;
    if (ratio === 1) message = "完美！你已获得「深空天体导航员」最高头衔！🌌";
    else if (ratio >= 0.8) message = "极其出色，宇宙深处的秘密已被你洞悉大半！✨";
    else if (ratio >= 0.6) message = "干得不错，下一次航行一定会更上一层楼！🚀";
    else message = "万事开头难，多用“星空闪卡”在基地里模拟训练一下吧！🔭";

    document.getElementById('result-message').innerText = message;
}

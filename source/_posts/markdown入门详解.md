---
title: Markdown与hexo使用详解
date: 2026-07-23 15:38:09
categories:
  - 开发必备
cover: images/leetcode/cover.png
---
# 一级标题



## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

## 文本样式
你好
*你好*
**你好** 
***你好***
~~你好~~
## 列表
### 无序列表
- 项目1
- 项目2
- 项目3
    - 子项目1
    - 子项目2
### 有序列表
1.第一项
2.第二项
3.第三项
### 任务列表
- [] 未完成
- [×] 已完成
## 引用
> 一级引用
>>  二级引用
>>>   三级引用

## 分割线
---
***
##  行内代码
这是 `行内代码` 演示
## 代码块
```python
print("py演示")
```
## 图片
语法：! [图片描述](图片地址)  

---

## 让内容更显眼（Butterfly 标签插件）

### 1. 高亮标记 (Mark)
使用 `==文字==` 标记需要强调的内容：
==这是高亮文字== 普通文字 ==再次高亮==

### 2. 键盘按键
使用 `<kbd>按键</kbd>` 显示键盘样式：
按 <kbd>Ctrl</kbd> + <kbd>C</kbd> 复制，<kbd>Ctrl</kbd> + <kbd>V</kbd> 粘贴

### 3. 带下划线的插入文字
使用 `++文字++` 表示新增/插入的内容：
原有内容 ++新增的内容++ 后续内容

### 4. 彩色标签 (Label)
使用 `{% label 文字 颜色 %}` 创建彩色内联标签：

可用颜色：`default` / `blue` / `pink` / `red` / `purple` / `orange` / `green`

示例：
{% label 默认 default %}
{% label 蓝色 blue %}
{% label 粉色 pink %}
{% label 红色 red %}
{% label 紫色 purple %}
{% label 橙色 orange %}
{% label 绿色 green %}

### 5. 提示/警告块 (Note)
使用 `{% note 类型 %}内容{% endnote %}` 创建带图标的彩色提示框。

支持类型：`default` / `primary` / `info` / `success` / `warning` / `danger`
（注意：Note 支持的颜色名与 Label 不同，不要混用）

**默认提示：**
{% note default %}
这是默认提示内容，常用于一般说明。
{% endnote %}

**主要提示：**
{% note primary %}
这是主要提示，提供重要信息。
{% endnote %}

**信息提示：**
{% note info %}
这是信息提示，提供有用的补充说明。
{% endnote %}

**成功提示：**
{% note success %}
操作成功！数据已保存。
{% endnote %}

**警告提示：**
{% note warning %}
注意：此操作不可撤销，请谨慎操作。
{% endnote %}

**危险提示：**
{% note danger %}
危险：删除后数据将永久丢失！
{% endnote %}

**自定义图标（Font Awesome）：**
{% note warning, fas fa-exclamation-triangle %}
自定义图标，增加视觉辨识度。
{% endnote %}

### 6. 按钮 (Button)
使用 `{% btn "链接" "文字" "图标" "选项" %}` 创建漂亮的按钮链接。

颜色：`default` / `blue` / `pink` / `red` / `purple` / `orange` / `green`
选项：`outline` / `center` / `block` / `larger`

{% btn "https://github.com" "访问 GitHub" "fab fa-github" "blue, larger" %}
{% btn "https://example.com" "了解更多" "fas fa-book" "green, outline" %}
{% btn "https://example.com" "重要链接" "fas fa-star" "red, block" %}

### 7. 选项卡 (Tabs)
使用 `{% tabs 名称 %}` 标签组组织多栏内容。

{% tabs 编程语言 %}
<!-- tab Python -->
```python
def hello():
    print("Hello, World!")
```
<!-- endtab -->
<!-- tab JavaScript -->
```javascript
function hello() {
    console.log("Hello, World!");
}
```
<!-- endtab -->
<!-- tab Go -->
```go
func main() {
    fmt.Println("Hello, World!")
}
```
<!-- endtab -->
{% endtabs %}

### 8. 时间线 (Timeline)
使用 `{% timeline "标题",颜色 %}` 创建垂直时间线。

支持颜色：`default` / `blue` / `pink` / `red` / `purple` / `orange` / `green`

{% timeline "学习路线","blue" %}
<!-- timeline 2024年 -->
- 学习 HTML/CSS/JavaScript 基础
- 掌握 Git 版本控制
<!-- endtimeline -->
<!-- timeline 2025年 -->
- 深入学习 React / Vue
- 学习 Node.js 后端开发
<!-- endtimeline -->
<!-- timeline 2026年 -->
- 独立开发全栈项目
- 输出技术博客和开源项目
<!-- endtimeline -->
{% endtimeline %}

### 9. 隐藏/展开内容 (Hide)
点击按钮才显示的折叠内容。

**内联隐藏：**
答案是 {% hideInline "42" "点击查看答案" "#49b1f5" "#fff" %}

**块级折叠：**
{% hideToggle "点击展开详细解释" %}
这是一段详细内容，默认被折叠。
可以包含 **Markdown** 格式和代码块。
{% endhideToggle %}  
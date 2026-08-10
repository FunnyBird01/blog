---
title: python
date: 2026-08-03 23:45:16
cover: https://cdn-icons-png.flaticon.com/256/11933/11933136.png
---
# 深浅拷贝
```python
import copy
a = [1,2,[3,4]]
b = copy.copy(a)
c = copy.deepcopy(a)
a[0]=11   #b、c都不变
a[2][0]=33   #b跟者a变，c不改变
```

- 浅拷贝：一层独立，内层共享
创建新对象，但只复制顶层数据，
嵌套的子对象仍然引用原对象，
修改嵌套内容会互相影响。

- 深拷贝：完全独立，互不影响
创建完全独立的新对象，
递归复制所有层级的数据，
新旧对象互不影响。

# new与init
```python
class person:
    def __new__(cls,*args,**kwargs):
        print("调用 __new__，创建对象")
        return super().__new__(cls)

    def __init__(self,name):
        print("调用 __init__，初始化属性")
        self.name = name
p=person("张三")
```

new()方法创建对象
- 负责真正创建实例对象
- 在内存中开辟空间
- 返回创建好的对象
init()方法初始化对象
- 对象已经存在之后才调用
- 负责给对象赋值、初始化属性
- 没有返回值

# pandas
pandas 是 Python 里专门处理表格数据的库，相当于代码版的 Excel，用来读表、改表、筛选、统计、画图等操作。
## 前置知识
Series 是 pandas 最基本的数据结构，相当于 Excel 中的一列数据。
- 定义：一维数组，每个元素都有一个对应的索引
- 可以是数值、文本、日期等任意类型
- 可以进行数学运算、统计分析、可视化等操作
```python
import pandas as pd
s = pd.Series([1,2,3,4,5],index=['a','b','c','d','e'])
print(s)
```
DataFrame 是 pandas 最基本的数据结构，相当于 Excel 中的一张表格。
- 定义：二维数组，每个元素都有一个对应的索引
- 可以是数值、文本、日期等任意类型
- 可以进行数学运算、统计分析、可视化等操作
```python
import pandas as pd
df = pd.DataFrame({
    '姓名': ['小明', '小红', '小刚'],
    '年龄': [18, 19, 20],
    '成绩': [90, 85, 88]
})
print(df)
```
所有操作串在一起的完整案例:
```python
import pandas as pd

# 1. 先造一个测试表格（也可以换成你自己的 Excel/CSV）
data = {
    "姓名": ["小明", "小红", "小刚", "小丽", "小强"],
    "年龄": [18, 19, None, 20, 18],
    "成绩": [85, 92, 78, None, 90],
    "性别": ["男", "女", "男", "女", "男"]
}
df = pd.DataFrame(data)

# 2. 查看数据
print("===== 前3行 =====")
print(df.head(3))

print("\n===== 数据信息 =====")
df.info()

print("\n===== 统计信息 =====")
print(df.describe())

print("\n===== 行列数 =====", df.shape)
print("===== 列名 =====", df.columns.tolist())

# 3. 选列、选行
print("\n===== 只看姓名和成绩 =====")
print(df[["姓名", "成绩"]])

print("\n===== 前2行 =====")
print(df.iloc[:2])

print("\n===== 年龄>18的人 =====")
print(df[df["年龄"] > 18])

# 4. 新增、修改列
df["总分"] = df["成绩"] + 10  # 成绩加10分
df["是否及格"] = df["成绩"] >= 60
print("\n===== 新增列后 =====")
print(df)

# 5. 删除列
df = df.drop("年龄", axis=1)
print("\n===== 删除年龄列后 =====")
print(df)

# 6. 处理空值
print("\n===== 空值数量 =====")
print(df.isnull().sum())

df = df.fillna(0)  # 空值填0
print("\n===== 空值填充后 =====")
print(df)

# 7. 分组统计
print("\n===== 按性别统计平均成绩 =====")
print(df.groupby("性别")["成绩"].mean())

print("\n===== 按性别统计人数 =====")
print(df.groupby("性别").size())

# 8. 排序
df_sorted = df.sort_values(by="成绩", ascending=False)
print("\n===== 按成绩从高到低排序 =====")
print(df_sorted)

# 9. 保存文件
df.to_excel("处理后结果.xlsx", index=False)
df.to_csv("处理后结果.csv", index=False, encoding="utf-8")

```

---
title: "MySQL"
date: 2026-07-29 00:48:09
categories:
  - 开发必备
cover: "https://cdn-icons-png.flaticon.com/128/16548/16548967.png"
---
# MySQL
一款用来存储数据的数据库管理系统
使用标准SQL操作数据
连接相关信息：
```python
MYSQL_HOST = "localhost"
# MySQL服务地址
# localhost = 本机数据库；远程服务器需要填写IP，例如 "120.xx.xx.xx"
MYSQL_PORT = 3306
# MySQL 默认端口号，MySQL标准端口就是3306
# 如果你的数据库修改过端口，这里同步更改
MYSQL_USER = "root"
# 数据库登录用户名
# root是MySQL默认超级管理员账号
MYSQL_PASSWORD = "123456"
# 数据库登录密码，安装MySQL时设置的密码
DB_NAME = "sql_learn"
# 需要连接、操作的【数据库名称】（database库名）
# 对应你SQL脚本里的 USE sql_learn;
```
# mysql数据类型
MySQL 支持多种类型，大致可以分为三类：数值、日期/时间和字符串(字符)类型
## 数值类型
- 整数类型  - tinyint（256个值）、smallint（65536个值）、mediumint（16777216个值）、int（2^32个值）、bigint（2^64个值）
- 浮点数类型  - float、double
- 十精度数类型  - decimal（固定精度和小数位数）
- 位类型  - bit
## 日期和时间类型
- 日期类型  - date（年月日）格式：yyyy-MM-dd
- 时间类型  - time（时分秒）格式：hh:mm:ss
- 日期时间类型  - datetime（年月日 时分秒）格式：yyyy-MM-dd hh:mm:ss
- 时间戳类型  - timestamp（年月日 时分秒）格式：yyyy-MM-dd hh:mm:ss 
- 年类型  - year（年）格式：yyyy
{% note info %}
datetime：原样存时间，不受时区影响、能用几千年
timestamp：存 UTC 秒数、跟着时区变、可以自动更新、2038 年就报废
{% endnote %}
## 字符串类型
- 字符类型  - char（固定长度）、varchar（可变长度）
- 文本类型  - text（固定长度）、mediumtext（可变长度）、longtext（可变长度）
- 二进制类型  - blob（固定长度）、mediumblob（可变长度）、longblob（可变长度）

# 创建数据库
1. mysql服务，安装完mysql之后，启动mysql服务(在服务中可将其设为自启)
2. 进入命令行，使用命令`mysql -u root -p`进入mysql命令行，输入密码，进入mysql命令行
```sql
mysql -h localhost -u root -p  #连接mysql   localhost：主机名   root:用户名   -p:使用密码登录
```
3. 创建数据库，使用命令`create database 数据库名;
4. 退出mysql命令行
```sql
exit;
```

# mysql用户设置


# 操作数据库
- 创建数据库
```sql
create database if not exists 数据库名 character set utf8mb4 collate utf8mb4_unicode_ci;
# 创建数据库，如果数据库不存在则创建，字符集为utf8mb4，规定能放什么;
# 排序规则为utf8mb4_unicode_ci,查询时不区分大小写
```
- 删除数据库
```sql
drop database if exists 数据库名;
```
- 展示数据库
```sql
show databases;
```
- 切换(使用)数据库，后续sql操作都在该数据库下进行
```sql
use 数据库名;
```
- 展示数据库表
```sql
show tables;
```
- 显示表信息
```sql
describe 表名;
```
- 表的索引信息
```sql
show indexes from 表名;
```



# 操作表
## 创建
{% label 语法 blue %}
{% note primary %}
create table if not exists 表名（
    字段名（列） 数据类型 约束,
    ...
    字段名 数据类型 约束,
    ...
）
{% endnote %}
{% label 实例 green %}
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    birthdate DATE,
    is_active BOOLEAN DEFAULT TRUE
);
```
{% note info %}
PRIMARY KEY：主键，唯一标识每一行数据
NOT NULL：非空约束，不能为空
DEFAULT TRUE：默认值为 TRUE
BOOLEAN：布尔类型，只能取 TRUE 或 FALSE
{% endnote %}

## 删除
{% label 语法 blue %}
{% note primary %}
drop table if exists 表名;
{% endnote %}
{% label 实例 green %}
```sql
DROP TABLE if exists users;
```
{% note info %}
想清除表中的所有数据，不删除表结构
truncate table users;
{% endnote %}
{% note warning %}
- 备份数据：在删除表之前，确保已经备份了数据，如果你需要的话。
- 外键约束：如果该表与其他表有外键约束，可能需要先删除外键约束，或者确保依赖关系被处理好。
{% endnote %}

## 插入数据
{% label 语法 blue %}
{% note primary %}
insert into 表名（字段名1,字段名2,字段名3）
values（值1,值2,值3）
{% endnote %}
{% label 实例 green %}
```sql
INSERT INTO users (username, email, birthdate)
VALUES ('johndoe', 'johndoe@example.com', '1990-01-01');
```
{% note info %}
如果表中没有主键，会自动生成一个主键值
{% endnote %}
如果你要插入所有列的数据，可以省略列名：
```sql
INSERT INTO users
VALUES (NULL,'test', 'test@runoob.com', '1990-01-01', true);
```
{% note info %}
NULL 是用于自增长列的占位符，表示系统将为 id 列生成一个唯一的值。
{% endnote %}
{% note warning %}
字符串、日期必须套上单引号 ''，数字不用
{% endnote %}

## 查询数据
{% label 语法 blue %}
{% note primary %}
select 字段名1,字段名2,字段名3/*（*表示查询所有字段）
from 表名
{% endnote %}
{% label 实例 green %}
```sql
SELECT * FROM users;
```
### group by 分组查询
GROUP BY 语句根据一个或多个列对结果集进行分组。
在分组的列上我们可以使用 COUNT, SUM, AVG,等函数。
GROUP BY 语句是 SQL 查询中用于汇总和分析数据的重要工具，尤其在处理大量数据时，它能够提供有用的汇总信息。
{% label 语法 blue %}
{% note primary %}
SELECT column1, aggregate_function(column2)   # 分组列，聚合函数列
FROM table_name
WHERE condition   # 可选，条件查询
GROUP BY column1;   # 分组列
{% endnote %}
{% label 实例 green %}
1. 选择每个客户的订单金额总和
```sql
SELECT customer_id, SUM(order_amount) AS total_amount
FROM orders
GROUP BY customer_id;
```
> 先分组，把同一个客户的所有订单归到一堆，再对每个客户的订单金额总和进行汇总。
{% note info %}
- 只分组不聚合：一堆明细堆在一起，你看不出汇总结果；
- 聚合（SUM()、AVG()、COUNT()、MAX()、MIN()）就是用来给每一组算出一个统计值。
{% endnote %}
2. 附带with rollup
```sql
SELECT customer_id, SUM(order_amount) AS total_amount
FROM orders
GROUP BY customer_id
WITH ROLLUP;
```
{% note info %}
- WITH ROLLUP 选项会为每个分组（包括总和）添加一个行，显示所有分组的总和。
{% endnote %}




### union 合并查询结果
UNION 操作符用于连接两个以上的 SELECT 语句的结果组合到一个结果集合，并去除重复的行。
UNION 操作符必须由两个或多个 SELECT 语句组成，每个 SELECT 语句的列数和对应位置的数据类型必须相同(列数必须相同)
> 把两条 SELECT 查询出来的两张结果表，上下拼合成一张大表

{% label 语法 blue %}
{% note primary %}
SELECT column1, column2, ...
FROM table1
UNION
SELECT column1, column2, ...
FROM table2
{% endnote %}
{% label 实例 green %}
1. 选择客户表和供应商表中所有城市的唯一值，并按城市名称升序排序。
```sql
SELECT city FROM customers
UNION
SELECT city FROM suppliers
ORDER BY city;
```
2. 选择电子产品和服装类别的产品名称，并按产品名称升序排序。
```sql
SELECT product_name FROM products
WHERE category = 'electronics'
UNION
SELECT product_name FROM products
WHERE category = 'clothing'
ORDER BY product_name;
```
3. 使用 UNION ALL 不去除重复行：
```sql
SELECT city FROM customers
UNION ALL
SELECT city FROM suppliers
ORDER BY city;
```


### where 条件查询
{% label 语法 blue %}
{% note primary %}
select 字段名1,字段名2,字段名3/*（*表示查询所有字段）
from 表名
where 条件
{% endnote %}
{% label 实例 green %}
```sql
SELECT * FROM users WHERE is_active = TRUE;
```
{% note info %}
条件可以是任意的 SQL 表达式，例如 `is_active = TRUE`、`birthdate > '1990-01-01'` 等。
可以使用 AND 或者 OR 指定一个或多个条件。
WHERE 子句也可以运用于 SQL 的 DELETE 或者 UPDATE 命令。
{% endnote %}
### order by 排序查询
{% label 语法 blue %}
{% note primary %}
select 字段名1,字段名2,字段名3 /*（*表示查询所有字段）
from 表名
order by 字段名1 ASC/DESC,字段名2 ASC/DESC,字段名3 ASC/DESC
{% endnote %}
{% label 实例 green %}
1. 按产品名称升序排序
```sql
SELECT * FROM products
ORDER BY product_name ASC;
```
2. 按产品名称降序排序
```sql
SELECT * FROM products
ORDER BY product_name DESC;
```
3. 先按部门 ID 升序排序，相同部门中再按雇佣日期降序排序
```sql
SELECT * FROM employees
ORDER BY department_id ASC, hire_date DESC;
```
4. 使用数字表示列的位置，
```sql
SELECT first_name, last_name, salary FROM employees
ORDER BY 2 ASC, 3 DESC;
```
> 选择员工表 employees 中的名字和工资列，并按第三列（salary）降序 DESC 排序，然后按第一列（first_name）升序 ASC 排序。

5. 使用表达式排序，按折扣后的价格降序排序
```sql
SELECT product_name, price * discount_rate AS discounted_price
FROM products
ORDER BY discounted_price DESC;
```
> 选择产品表 products 中的产品名称和折扣后的价格列，并按折扣后的价格降序 DESC 排序。
### limit 分页查询
{% label 语法 blue %}
{% note primary %}
select 字段名1,字段名2,字段名3/*（*表示查询所有字段）
from 表名
limit 偏移量, 行数
{% endnote %}
{% label 实例 green %}
查询第一页数据（每页 10 条）
```sql
SELECT * FROM users LIMIT 0, 10;
```
查询第二页数据（每页 10 条）
```sql
SELECT * FROM users LIMIT 10, 10;
```
{% note info %}
limit 子句可以指定查询的行数和偏移量。
偏移量从 0 开始，行数默认为 10。
{% endnote %}
### like 模糊查询
{% label 语法 blue %}
{% note primary %}
select 字段名1,字段名2,字段名3/*（*表示查询所有字段）
from 表名
where 字段名 like '%模式%'
{% endnote %}
{% label 实例 green %}
% 匹配任意 0 个或多个字符，查询所有用户名包含 l 的用户
```sql
SELECT * FROM users WHERE username LIKE 'l%'; #l开头的用户名
SELECT * FROM users WHERE username LIKE '%l'; #l结尾的用户名
SELECT * FROM users WHERE username LIKE '%l%'; #包含l的用户名
```
_ 通配符表示一个字符,查询所有用户名以 x 结尾的用户
```sql
SELECT * FROM users WHERE username LIKE 'x_'; #x开头的用户名（2个字符）
SELECT * FROM users WHERE username LIKE '_x'; #x结尾的用户名（2个字符）
SELECT * FROM users WHERE username LIKE '_x_'; #中间包含x的用户名(3字符)
SELECT * FROM users WHERE username LIKE '___'; #包含3个字符的用户名
```
_、%组合使用，查询所有用户名以 x 结尾的用户
```sql
SELECT * FROM users WHERE username LIKE '%x_'; #倒数第二个字符为x的用户名
SELECT * FROM users WHERE username LIKE '%_x'; #倒数第一个字符为x的用户名
SELECT * FROM users WHERE username LIKE '%__'; #至少包含2个字符的用户名
```
## 更新数据
### alter
> ALTER 用来修改已经存在的表结构，不能修改表里面的数据（修改数据用UPDATE）。
五大常用功能：添加列、删除列、修改列、重命名列、修改表名、修改约束
1. 添加列 add
{% label 语法 blue %}
{% note primary %}
alter table 表名
add column 字段名 数据类型;
{% endnote %}
{% label 实例 green %}
```sql
ALTER TABLE users
ADD COLUMN email VARCHAR(255);
```
> 添加一个名为 email 的列，数据类型为 VARCHAR(255)。

2. 修改列的数据类型 modify
{% label 语法 blue %}
{% note primary %}
alter table 表名
modify column 字段名 数据类型;
{% endnote %}
{% label 实例 green %}
```sql
ALTER TABLE users
MODIFY COLUMN email VARCHAR(255);

--拓展：修改字段并加上非空约束
ALTER TABLE users
MODIFY COLUMN phone CHAR(11) NOT NULL;
```
> 修改 email 列的数据类型为 VARCHAR(255)。

3. 修改列名 change
{% label 语法 blue %}
{% note primary %}
alter table 表名
change column 旧列名 新列名 数据类型;
{% endnote %}
{% label 实例 green %}
```sql
ALTER TABLE users
--旧名→新名，必须重写一遍数据类型，就算类型不变也要写
CHANGE COLUMN email new_email VARCHAR(255);
```
> 修改 email 列的名称为 new_email，数据类型为 VARCHAR(255)。

4. 删除列 drop
{% label 语法 blue %}
{% note primary %}
alter table 表名
drop column 字段名;
{% endnote %}
{% label 实例 green %}
```sql
ALTER TABLE users
DROP COLUMN email;
```
> 删除 email 列。
{% note danger %}
危险操作：删除后该列所有数据永久丢失，不可恢复！
{% endnote %}


5. 修改表名 rename
{% note primary %}
alter table 表名
rename to 新表名;
{% endnote %}
{% label 实例 green %}
```sql
ALTER TABLE users RENAME TO new_users;
```
> 将表名从 users 改为 new_users。

6. 添加主键 primary key
{% label 语法 blue %}
{% note primary %}
alter table 表名
add primary key 字段名;
{% endnote %}
{% label 实例 green %}
```sql
ALTER TABLE users
ADD PRIMARY KEY (id);
```
> 添加一个名为 id 的主键，用于唯一标识每条记录。

7. 添加外键 foreign key
{% label 语法 blue %}
{% note primary %}
ALTER TABLE 子表名
ADD CONSTRAINT 外键约束名
FOREIGN KEY (外键列名)
REFERENCES 父表名 (主键列名);
{% endnote %}
{% label 实例 green %}
```sql
ALTER TABLE orders
ADD CONSTRAINT fk_customer
FOREIGN KEY (customer_id)
REFERENCES customers (customer_id);
```
>  orders 表中添加了一个外键，关联到 customers 表的 customer_id 列：

8. 添加唯一约束 unique key
{% label 语法 blue %}
{% note primary %}
alter table 表名
add constraint 唯一约束名 unique (字段名);
{% endnote %}
{% label 实例 green %}
```sql
ALTER TABLE users
ADD CONSTRAINT uk_email UNIQUE(email);
```
> 添加一个名为 uk_email 的唯一约束，用于确保 email 列中的每个值都是唯一的。

9. 删除唯一约束 unique key
{% label 语法 blue %}
{% note primary %}
alter table 表名
drop index 唯一约束名;
{% endnote %}
{% label 实例 green %}
```sql
ALTER TABLE users
DROP INDEX uk_email;
```
> 删除名为 uk_email 的唯一约束，允许 email 列中的重复值。

10. 添加默认值
{% label 语法 blue %}
{% note primary %}
alter table 表名
modify column 字段名 数据类型 default 值;
{% endnote %}
{% label 实例 green %}
```sql
ALTER TABLE users
MODIFY COLUMN email VARCHAR(255) DEFAULT 'default@example.com';
```
> 修改 email 列的默认值为 default@example.com。



### update
{% label 语法 blue %}
{% note primary %}
update 表名
set 字段名1 =值1,字段名2 =值2,字段名3 =值3
where 条件
{% endnote %}
{% label 实例 green %}
条件可以是任意的 SQL 表达式，例如 `id = 1`、`username = 'johndoe'`' 等。
```sql
UPDATE users
SET username = 'johndoe', email = 'johndoe@example.com'
WHERE id = 1;
```
无条件，会更新所有数据
```sql
UPDATE users
SET username = 'johndoe', email = 'johndoe@example.com';
```
更新使用子查询的条件（更新所有活跃用户的用户名和邮箱为 johndoe@example.com）
```sql
UPDATE users
SET username = 'johndoe', email = 'johndoe@example.com'
WHERE id IN (SELECT id FROM users WHERE is_active = TRUE);
```
{% note warning %}
更新数据时，要确保条件是正确的，否则会更新所有数据。
{% endnote %}
### delete
{% label 语法 blue %}
{% note primary %}
delete from 表名
where 条件
{% endnote %}
{% label 实例 green %}
条件可以是任意的 SQL 表达式，例如 `id = 1`、`username = 'johndoe'`' 等。
```sql
DELETE FROM users
WHERE id = 1;
```
无条件，会删除所有数据
```sql
DELETE FROM users;
```
删除使用子查询的条件（删除所有活跃用户的记录）
```sql
DELETE FROM users
WHERE id IN (SELECT id FROM users WHERE is_active = TRUE);
```
{% note warning %}
删除数据时，要确保条件是正确的，否则会删除所有数据。
{% endnote %}

## 多表查询join
 JOIN 在两个或多个表中查询数据
### inner join(内连接)
> join默认是内连接
内连接：返回两个表中都有匹配值的行
{% label 语法 blue %}
{% note primary %}
SELECT column1, column2, ...
FROM table1
INNER JOIN table2 ON table1.column_name = table2.column_name; #连接条件，指定了两个表中用于匹配的列。
{% endnote %}
{% label 实例 green %}
1. 选择 orders 表和 customers 表中满足连接条件的订单 ID 和客户名称。
```sql
SELECT orders.order_id, customers.customer_name
FROM orders
INNER JOIN customers ON orders.customer_id = customers.customer_id;
```
> 选择订单表 orders 中的订单 ID 和客户表 customers 中的客户名称，连接条件是订单表中的客户 ID 等于客户表中的客户 ID。

2. 多表连接
```sql
SELECT orders.order_id, customers.customer_name, products.product_name
FROM orders
INNER JOIN customers ON orders.customer_id = customers.customer_id
INNER JOIN products ON orders.product_id = products.product_id;
```
> 选择订单表 orders 中的订单 ID、客户表 customers 中的客户名称、产品表 products 中的产品名称，连接条件是订单表中的客户 ID 等于客户表中的客户 ID，订单表中的产品 ID 等于产品表中的产品 ID。

3. 使用 WHERE 子句进行过滤
```sql
SELECT orders.order_id, customers.customer_name
FROM orders
INNER JOIN customers ON orders.customer_id = customers.customer_id
WHERE orders.order_date >= '2023-01-01';
```
> 选择订单表 orders 中的订单 ID、客户表 customers 中的客户名称，连接条件是订单表中的客户 ID 等于客户表中的客户 ID，订单日期大于等于 2023 年 1 月 1 日。

### left join(左连接)
左连接：左边整张表所有行全部保留！右边匹配不到就填充 NULL
{% note warning %}
FROM 后面第一张表 = 左表！
{% endnote %}
{% label 语法 blue %}
{% note primary %}
SELECT column1, column2, ...
FROM table1        #左表
LEFT JOIN table2 ON table1.column_name = table2.column_name; #连接条件，指定了两个表中用于匹配的列。
{% endnote %}
{% label 实例 green %}
1. 
```sql
SELECT customers.customer_id, customers.customer_name, orders.order_id
FROM customers
LEFT JOIN orders ON customers.customer_id = orders.customer_id;
```
> 选择客户表中的客户 ID 和客户名称，并包括左表 customers 中的所有行，以及匹配的订单 ID（如果有的话）。

### right join(右连接)
右连接：右边整张表所有行全部保留！左边匹配不到就填充 NULL
{% label 语法 blue %}
{% note primary %}
SELECT column1, column2, ...
FROM table1
RIGHT JOIN table2 ON table1.column_name = table2.column_name; 
{% endnote %}
{% label 实例 green %}
1. 
```sql
SELECT orders.order_id, customers.customer_name, orders.order_date
FROM orders
RIGHT JOIN customers ON orders.customer_id = customers.customer_id;
```

# null值处理
null值：表示缺失或未知的值。
处理方法：
- is null:当列的值是 NULL,此运算符返回 true。
- is not null:当列的值不是 NULL,此运算符返回 true。
- <=>:比较操作符（不同于 = 运算符），当比较的的两个值相等或者都为 NULL 时返回 true。
{% note warning %}
你不能使用 = NULL 或 != NULL 在列中查找 NULL 值 
NULL 值与任何其它值的比较（即使是 NULL）永远返回 NULL，即 NULL = NULL 返回 NULL 。
{% endnote %}
案例：
1. 转换 null 值为 0
```sql
select * , columnName1+ifnull(columnName2,0) from tableName;
```
> columnName2 中，有值为 null 时，columnName1+columnName2=null， ifnull(columnName2,0) 把 columnName2 中 null 值转为 0。

2. 检查是否为 NULL：
```sql
SELECT * FROM employees WHERE department_id IS NULL;
SELECT * FROM employees WHERE department_id IS NOT NULL;
```
3. 使用 COALESCE 函数处理 NULL：
```sql
SELECT product_name, COALESCE(stock_quantity, 0) AS actual_quantity
FROM products;
```
> 如果 stock_quantity 列为 NULL，则 COALESCE 将返回 0。

4. 使用 IFNULL 函数处理 NULL：
```sql
SELECT product_name, IFNULL(stock_quantity, 0) AS actual_quantity
FROM products;
```
> IFNULL 函数是 COALESCE 的 MySQL 特定版本，它接受两个参数，如果第一个参数为 NULL，则返回第二个参数。

5. null排序
```sql
SELECT product_name, price
FROM products
ORDER BY price ASC; -- NULL 排最前面
ORDER BY ISNULL(price), price ASC; -- NULL 排最后面
ORDER BY ISNULL(price) DESC, price DESC; -- NULL 排最前面 1>0
```
6. 使用 <=> 操作符进行 NULL 比较
两个值都为 NULL 返回 true；普通相等也返回 true
```sql
SELECT * FROM employees WHERE commission <=> NULL; -- 没有佣金的员工
```
7. 注意聚合函数对 NULL 的处理
{% note warning %}
SUM、AVG、MAX、MIN 自动跳过 NULL 
⚠️COUNT(列名)：跳过 NULL；COUNT(*)：不会跳过 NULL，统计所有行数
{% endnote %}
在使用聚合函数（如 SUM, AVG）时，它们会忽略 NULL 值，因此可能会得到不同于预期的结果。如果希望将 NULL 视为 0，可以使用 COALESCE 或 IFNULL。
```sql
SELECT AVG(COALESCE(salary, 0)) AS avg_salary FROM employees;
```
> 这样即使 salary 为 NULL，聚合函数也会将其视为 0。

# 正则表达式
正则表达式：用于匹配字符串模式的模式。
**信息提示：**
{% note info %}
- LIKE：只有 % 和 _ 两个通配符，能力弱
- REGEXP：完整正则，匹配字符串内部任意位置，不需要前后加通配符
{% endnote %}
测试表：
```sql
CREATE TABLE test(name VARCHAR(20));
INSERT test VALUES('apple'),('banana'),('app'),('pineapple'),('123abc');
```
{% label 实例 green %}
1. ^ 匹配字符串的开头
```sql
SELECT * FROM test WHERE name REGEXP '^app';
```
> 匹配所有以 app 开头的字符串。# app apple 

2. $ 匹配字符串的结尾
```sql
SELECT * FROM test WHERE name REGEXP 'ple$';
```
> 匹配所有以 ple 结尾的字符串。# apple pineapple 

3. \[ ] 匹配方括号中的任意字符
```sql
--匹配包含 a,b,c 任意一个字母
SELECT * FROM test WHERE name REGEXP '[abc]';
--匹配数字
SELECT * FROM test WHERE name REGEXP '[0-9]';
--匹配小写字母
SELECT * FROM test WHERE name REGEXP '[a-z]';
```
4. [^ ] 取反匹配
{% note warning %}
 - [^ ] 匹配不在方括号中的字符
 - ^写在中括号外面 → 代表字符串开头
{% endnote %}
```sql
--含有不是数字的字符
name REGEXP '[^0-9]'
```
5.  \* + ? 重复次数
```sql
--b出现0次或多次
name REGEXP 'ab*c'
--b至少出现1次
name REGEXP 'ab+c'
--b出现0次或1次
name REGEXP 'ab?c'
```
6. | 匹配或操作
```sql
--包含 apple 或者 banana
SELECT * FROM test WHERE name REGEXP 'apple|banana';
```
> 匹配所有包含 apple 或者 banana 的字符串。# apple banana 

7. {} 匹配指定次数
```sql
--a连续出现3次
name REGEXP 'a{3}'
--a连续出现最少2次，最多5次
name REGEXP 'a{2,5}'
```
8. () 分组
```sql
--匹配 abc 或者 abd
name REGEXP 'ab(c|d)'
```

# 事务

事务主要用于处理操作量大，复杂度高的数据。比如说，在人员管理系统中，你删除一个人员，你既需要删除人员的基本资料，也要删除和该人员相关的信息，如信箱，文章等等，这样，这些数据库操作语句就构成一个事务！
一组SQL语句的执行，它们被视为一个单独的工作单元。
> 将几个sql语句组合起来，作为一个事务执行。
- 在 MySQL 中只有使用了 Innodb 数据库引擎的数据库或表才支持事务。
- 事务处理可以用来维护数据库的完整性，保证成批的 SQL 语句要么全部执行，要么全部不执行。
- 事务用来管理 insert、update、delete 语句
> 一般来说，事务是必须满足4个条件（ACID）：：原子性（Atomicity，或称不可分割性）、一致性（Consistency）、隔离性（Isolation，又称独立性）、持久性（Durability）。
  - 原子性：一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。
  - 一致性：在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。
  - 隔离性：数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。事务隔离分为不同级别，包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）。
  - 持久性：事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。
```sql
-- 开始事务,也可以使用 begin，begin在存储中有歧义
start transaction;
-- 执行 SQL 语句
-- 中途出错，回滚事务
rollback;
commit;
```
{% label 实例 green %}

1. 成功事务
```sql
--1.开启事务
START TRANSACTION;

--2.张三减100
UPDATE account SET money = money - 100 WHERE name='张三';

--3.李四加100
UPDATE account SET money = money + 100 WHERE name='李四';

--4.提交事务，永久生效！
COMMIT;
```
2. 中途出错，回滚事务
```sql
START TRANSACTION;

UPDATE account SET money = money - 100 WHERE name='张三';
--这里故意出错，程序中断，李四没有加上钱！
UPDATE account SET money = money - 10000 WHERE name='李四';
ROLLBACK; --回滚，撤销上面张三扣钱的SQL

COMMIT;
```
事务并发问题
{% note warning %}
- 事务并发问题是指在多个事务同时执行时，由于事务之间的依赖关系，导致数据不一致或不完整的情况。
{% endnote %}
1. 脏读
> 一个事务读到了另一个事务还没有提交的数据。
事务 A 修改数据未提交，事务 B 读到这个临时数据，A 最后回滚 → B 读到的数据就是脏数据。

2. 不可重复读
>同一个事务内，两次读取同一行数据，中间被别的事务修改并提交，两次结果不一样。
重点：修改数据

3. 幻读
> 同一个事务，两次查询，中间别的事务新增 / 删除了一行，第二次查询行数变了，像幻觉。
重点：新增、删除行

解决方法
> 设置事务隔离级别，避免并发并发问题。隔离级别越高，并发性能越低，越安全。
```sql
--（读未提交，有脏读、不可重复读、幻读）
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
--（读已提交，有不可重复读、幻读）
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
--（可重复读，MySQL 默认，有幻读）
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE‑READ;
--（串行化，没有问题）
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

# 索引
索引是一种数据结构，用于加快数据库查询的速度和性能，通过在表的列上创建索引，可以快速定位到需要的数据行。
分类：
- 普通索引
- 唯一索引
- 主键索引
- 复合索引

1. 创建普通索引
{% label 语法 blue %}
{% note primary %}
create index 索引名
on 表名 (字段名);
{% endnote %}
{% label 实例 green %}
```sql
CREATE INDEX idx_name ON users(name);
```
> 创建一个名为 idx_name 的普通索引，用于加速查询 name 字段的效率。

2. 创建唯一索引 UNIQUE INDEX
{% label 语法 blue %}
{% note primary %}
create unique index 索引名
on 表名 (字段名);
{% endnote %}
{% label 实例 green %}
```sql
CREATE UNIQUE INDEX idx_users_phone
ON users (phone);
```
> 在 users 表 phone 字段创建唯一索引，phone 的值不允许重复。

3. 创建复合索引
{% label 语法 blue %}
{% note primary %}
create index 索引名
on 表名 (字段名1,字段名2);
{% endnote %}
{% label 实例 green %}
```sql
CREATE INDEX idx_users_name_phone
ON users (name, phone);
```
> 在 users 表 name 字段和 phone 字段创建复合索引

4. 删除索引 DROP INDEX
{% label 语法 blue %}
{% note primary %}
drop index 索引名;
{% endnote %}
{% label 实例 green %}
```sql
DROP INDEX idx_users_name_phone ON users;
```
> 删除 users 表上名为 idx_users_name_phone 的索引。

6. 查看索引
{% label 语法 blue %}
{% note primary %}
show indexes from 表名;
{% endnote %}
{% label 实例 green %}
```sql
SHOW INDEXES FROM users;
```
> 查看 users 表上的所有索引。

{% note info %}
索引不能直接修改，如果想要修改一个索引：先删除旧索引，再新建新索引。
{% endnote %}
```sql
-- 修改索引的正确流程
DROP INDEX idx_users_email ON users;
CREATE INDEX idx_users_new_email ON users(new_email);
```

# 临时表
临时表是一种特殊的表，用于存储临时数据，临时表在会话结束时自动删除。

临时表的创建和使用
{% label 语法 blue %}
{% note primary %}
create temporary table 临时表名 (
    字段名 数据类型,
    字段名 数据类型,
    ...
);
{% endnote %}
{% label 实例 green %}
```sql
CREATE TEMPORARY TABLE temp_table (
    id INT,
    name VARCHAR(255),
    age INT
);
```
> 创建一个名为 temp_table 的临时表，包含 id、name 和 age 三个字段。
其他操作跟普通表一样，比如插入、查询、更新、删除等。

使用场景
1. 保存中间计算结果：一条 SQL 太复杂，分步计算，先把结果放进临时表，再二次查询
2. 拆分超长 SQL，简化多表联查：把多表查询结果先查出来存临时表，再做二次筛选
3. 缓存子查询结果，重复使用：一段结果要查询多次，查一次放入临时表，后面直接查临时表，减少重复运算
4. 存储一次性、过渡数据：报表统计、批量处理、导出数据时过渡存放数据，用完就丢，不需要手动清理
5. 隔离测试数据：测试时放临时数据，断开连接自动清空，不会污染正式数据表

> 什么时候不要用临时表：简单单表查询，没必要；频繁大量数据会消耗内存。

# 复制表
把一张已有表的表结构 / 表数据拷贝生成一张新表。

1. 复制表结构
{% label 语法 blue %}
{% note primary %}
create table 新表名 like 旧表名;
{% endnote %}
{% label 实例 green %}
```sql
CREATE TABLE new_users LIKE users;
```
> 创建一个名为 new_users 的新表，表结构与 users 表相同
{% note info %}
结构完全和 users 一模一样，新表里是空的，没有任何数据。
{% endnote %}

2. 复制结构 + 数据
{% label 语法 blue %}
{% note primary %}
CREATE TABLE 新表名
SELECT * FROM 原表名；
{% endnote %}
{% label 实例 green %}
```sql
CREATE TABLE users_copy2
SELECT * FROM users;
```
> 创建一个名为 users_copy2 的新表，表结构与 users 表相同，数据也相同。
{% note info %}
这种方式不会复制：主键、索引、自增、非空等约束！
{% endnote %}

3. 完全复刻原表
{% label 语法 blue %}
{% note primary %}
-- 第一步：复制结构（空表）
CREATE TABLE 新表名 LIKE 原表名；
-- 第二步：导入全部数据
INSERT INTO 新表名 SELECT * FROM 原表名；
{% endnote %}
{% label 实例 green %}
```sql
--复制完整表结构（主键索引都保留）
CREATE TABLE users_copy3 LIKE users;
--导入所有数据
INSERT INTO users_copy3 SELECT * FROM users;
```
> 创建一个名为 users_copy3 的新表，表结构与 users 表相同，数据也相同。
{% note info %}
约束、索引全部保留
{% endnote %}

# 元数据
元数据：描述数据的数据。
数据表里面存放的业务内容（学生姓名、订单金额）叫业务数据；
而用来描述数据库、表、列、索引信息的数据，就叫元数据。
通俗例子：
- 业务数据：name = '张三'
- 元数据：表名、列名、字段类型、长度、是否主键、创建时间、索引名称、库名

> 元数据不会存在你自己建的数据表里，MySQL 全部存放在一个特殊数据库：information_schema（信息模式库）
⚠️information_schema 库只能查询，不能执行 INSERT、UPDATE、DELETE 修改数据。

...

# 序列使用（AUTO_INCREMENT）
> 序列：自动生成一组连续、唯一、递增的数字，一般用来做主键 id，保证编号不会重复。

MySQL 靠自增主键 AUTO_INCREMENT实现序列效果
{% label 语法 blue %}
{% note primary %}
create table 表名 (
    字段名 数据类型 auto_increment,
    字段名 数据类型,
    ...
);
{% endnote %}
{% label 实例 green %}
```sql
CREATE TABLE student (
    id INT PRIMARY KEY AUTO_INCREMENT, -- 自增主键
    name VARCHAR(20)
);
```
> 创建一个名为 student 的新表，包含 id、name 两个字段。

{% note info %}
id 字段是自增主键，每次插入新数据时，id 会自动递增。
{% endnote %}


# 重复数据
## 防止重复数据
 MySQL 数据表中设置指定的字段为 PRIMARY KEY（主键） 或者 UNIQUE（唯一） 索引来保证数据的唯一性。
 1. 主键（PRIMARY KEY）
 ```sql
 CREATE TABLE person_tbl
(
   first_name CHAR(20) NOT NULL,
   last_name CHAR(20) NOT NULL,
   sex CHAR(10),
   PRIMARY KEY (last_name, first_name)
);
```
> 把 last_name + first_name 两个字段捆绑在一起，当作一个主键，确保组合值的唯一性。

 2. 唯一约束（UNIQUE）
 ```sql
CREATE TABLE user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(11) UNIQUE --手机号不能重复，可以为空
);
```
3. 唯一索引（UNIQUE INDEX）
> UNIQUE约束底层本质就是唯一索引，二者效果基本一样
```sql
CREATE UNIQUE INDEX uk_last_first 
ON person_tbl(last_name,first_name);

```
> 与主键区别：
- 主键：非空 + 唯一，一张表只能 1 个
- 唯一索引：唯一、允许 NULL，一张表可以建多个

## 处理重复数据
前提：表必须已经有主键 / UNIQUE 唯一约束。
1. 插入时遇到重复不报错（ON DUPLICATE KEY）
```sql
INSERT INTO person_tbl (last_name, first_name, sex)
VALUES ('Doe', 'John', 'M')
ON DUPLICATE KEY UPDATE sex = VALUES(sex);
```
> 插入 (last_name, first_name, sex) 字段值为 ('Doe', 'John', 'M') 的记录，
如果 last_name = 'Doe' 已存在，更新 sex 字段为 VALUES(sex) 即 'M'。


2. INSERT IGNORE（重复就跳过，不报错）
```sql
INSERT IGNORE INTO person_tbl (last_name, first_name, sex)
VALUES ('Doe', 'John', 'M');
```
> 插入 (last_name, first_name, sex) 字段值为 ('Doe', 'John', 'M') 的记录，
如果 last_name = 'Doe' 已存在，直接跳过，不报错。


# sql注入
所谓 SQL 注入，就是通过把 SQL 命令插入到 Web 表单递交或输入域名或页面请求的查询字符串，最终达到欺骗服务器执行恶意的 SQL 命令。
例子：
```sql
SELECT * FROM users WHERE username = 'admin' AND password = '123456';
```
> 这是一个查询语句，用于验证用户名和密码是否匹配。

攻击：
账号：admin' -- #闭合前面的单引号，截断 username 字符串，--后面加空格
密码：111

sql变成：
```sql
SELECT * FROM users WHERE username = 'admin' -- ' AND password = '111'
```
> 'admin'  -- 会注释掉密码字段，导致能登录成功。

防sql注入：
1. 参数化查询
{% label 语法 blue %}
{% note primary %}
SELECT * FROM users WHERE username = ? AND password = ?;
{% endnote %}
> 原理：SQL 语句结构提前编译好，用户输入只当做纯数据，永远不会被解析成 SQL 代码，单引号 '、-- 等注入符号失去作用。

2. 白名单校验（输入校验）
> 原理：只允许用户输入白名单中的字符，其他字符都拒绝。
> 例如：只允许用户输入字母、数字、下划线等字符，拒绝其他字符。

3. 最小权限原则（降低攻击后果）
> 原理：给数据库用户分配必要的权限，避免执行危险的 SQL 语句。
> 例如：只给数据库用户分配查询权限，不分配修改、删除权限。

# 导出导入数据
## 导出（备份）数据‑mysqldump
> mysqldump 是 MySQL 自带备份工具，在操作系统命令行 (cmd / 终端) 执行，不是在 mysql 客户端里面执行！

1. 导出所有数据库
{% label 语法 blue %}
{% note primary %}
mysqldump -u用户名 -p 数据库名 > 导出文件路径.sql
{% endnote %}
{% label 实例 green %}
```bash
mysqldump -uroot -p test_db > D:/backup/test_db.sql
```
> 导出数据库 test_db 到 test_db.sql 文件中。

2. 导出指定表
```bash
mysqldump -uroot -p test_db user student > D:/backup/tables.sql
```
> 导出数据库 test_db 中 user、student 两个表到 tables.sql 文件中。

...

## 导入数据
1. 命令行导入
{% label 语法 blue %}
{% note primary %}
mysql -u用户名 -p 数据库名 < 导入文件路径.sql
{% endnote %}
{% label 实例 green %}
```bash
mysql -uroot -p test_db < D:/backup/test_db.sql
```
> 导入数据库 test_db 到 test_db.sql 文件中，导入前，目标数据库必须先手动创建好！

2. 登录数据库客户端导入
{% label 语法 blue %}
{% note primary %}
source 导入文件路径.sql;
{% endnote %}
{% label 实例 green %}
```sql
source D:/backup/test_db.sql;
```
> 导入数据库 test_db 到 test_db.sql 文件中，导入前，目标数据库必须先手动创建好！

...

# mysql函数
> MySQL 提供了很多很多函数，用于处理数据、日期时间、字符串等。
简单举一些常用的函数：
1. CONCAT（拼接字符串）
```sql
SELECT CONCAT('Hello', ' ', 'World');
```
> 返回 'Hello World'

2. SUBSTRING（子字符串）
```sql
SELECT SUBSTRING('Hello World', 7);
```
> 返回 'World'

# mysql运算符
> MySQL 提供了很多很多运算符，用于处理数据、日期时间、字符串等。
简单举一些常用的运算符：

```sql
-- 查询商品原价100，打8折后的价格
SELECT 100 * 0.8 AS 折后价;

-- 查询员工月薪，算出年薪（月薪*12）
SELECT name,salary, salary * 12 AS year_salary 
FROM employee;

-- 取余数，判断奇数偶数
SELECT 5 % 2;

-- 查询年龄等于18岁的学生
SELECT * FROM student WHERE age = 18;

-- 查询分数大于60（及格）
SELECT * FROM student WHERE score > 60;

-- 查询年龄不等于18
SELECT * FROM student WHERE age <> 18;

-- 错误
SELECT * FROM student WHERE age = NULL;
-- ✅正确
SELECT * FROM student WHERE age IS NULL;

-- AND：分数大于60 并且 年龄大于18
SELECT * FROM student WHERE score>60 AND age>18;

-- OR：分数>90 或者 年龄=18
SELECT * FROM student WHERE score>90 OR age=18;

-- NOT：查询分数不大于60（不及格）
SELECT * FROM student WHERE NOT score>60;
-- 查询分数 60~90 分，60和90都会被查到
SELECT * FROM student WHERE score BETWEEN 60 AND 90;
```
# 命令大全
连接到 MySQL 数据库	mysql -u 用户名 -p
查看所有数据库	SHOW DATABASES;
选择一个数据库	USE 数据库名;
查看所有表	SHOW TABLES;
查看表结构	DESCRIBE 表名; 或 SHOW COLUMNS FROM 表名;
创建一个新数据库	CREATE DATABASE 数据库名;
删除一个数据库	DROP DATABASE 数据库名;
创建一个新表	CREATE TABLE 表名 (列名1 数据类型 [约束], 列名2 数据类型 [约束], ...);
删除一个表	DROP TABLE 表名;
插入数据	INSERT INTO 表名 (列1, 列2, ...) VALUES (值1, 值2, ...);
查询数据	SELECT 列1, 列2, ... FROM 表名 WHERE 条件;
更新数据	UPDATE 表名 SET 列1 = 值1, 列2 = 值2, ... WHERE 条件;
删除数据	DELETE FROM 表名 WHERE 条件;
创建用户	CREATE USER '用户名'@'主机' IDENTIFIED BY '密码';
授权用户	GRANT 权限 ON 数据库名.* TO '用户名'@'主机';
刷新权限	FLUSH PRIVILEGES;
查看当前用户	SELECT USER();
退出 MySQL	EXIT;
数据库相关命令
下面是与 MySQL 数据库操作相关的命令，包括创建、删除和修改数据库等操作：

操作命令
创建数据库	CREATE DATABASE 数据库名;
删除数据库	DROP DATABASE 数据库名;
修改数据库编码格式和排序规则	ALTER DATABASE 数据库名 DEFAULT CHARACTER SET 编码格式 DEFAULT COLLATE 排序规则;
查看所有数据库	SHOW DATABASES;
查看数据库详细信息	SHOW CREATE DATABASE 数据库名;
选择数据库	USE 数据库名;
查看数据库的状态信息	SHOW STATUS;
查看数据库的错误信息	SHOW ERRORS;
查看数据库的警告信息	SHOW WARNINGS;
查看数据库的表	SHOW TABLES;
查看表的结构	DESC 表名;
DESCRIBE 表名;
SHOW COLUMNS FROM 表名;
EXPLAIN 表名;
创建表	CREATE TABLE 表名 (列名1 数据类型 [约束], 列名2 数据类型 [约束], ...);
删除表	DROP TABLE 表名;
修改表结构	ALTER TABLE 表名 ADD 列名 数据类型 [约束];
ALTER TABLE 表名 DROP 列名;
ALTER TABLE 表名 MODIFY 列名 数据类型 [约束];
查看表的创建 SQL	SHOW CREATE TABLE 表名;
数据表相关命令
以下是与 MySQL 数据表相关的常用命令，包括创建、修改、删除表以及查看表的结构和数据等操作：

操作	命令
创建表	CREATE TABLE 表名 (列名1 数据类型 [约束], 列名2 数据类型 [约束], ...);
删除表	DROP TABLE 表名;
修改表结构	添加列: ALTER TABLE 表名 ADD 列名 数据类型 [约束];
删除列: ALTER TABLE 表名 DROP 列名;
修改列: ALTER TABLE 表名 MODIFY 列名 数据类型 [约束];
重命名列: ALTER TABLE 表名 CHANGE 旧列名 新列名 数据类型 [约束];
查看表结构	DESC 表名;
DESCRIBE 表名;
SHOW COLUMNS FROM 表名;
EXPLAIN 表名;
查看表的创建 SQL	SHOW CREATE TABLE 表名;
查看表中的所有数据	SELECT * FROM 表名;
插入数据	INSERT INTO 表名 (列1, 列2, ...) VALUES (值1, 值2, ...);
更新数据	UPDATE 表名 SET 列1 = 值1, 列2 = 值2, ... WHERE 条件;
删除数据	DELETE FROM 表名 WHERE 条件;
查看表的索引	SHOW INDEX FROM 表名;
创建索引	CREATE INDEX 索引名 ON 表名 (列名);
删除索引	DROP INDEX 索引名 ON 表名;
查看表的约束	SHOW CREATE TABLE 表名; (约束信息会包含在创建表的 SQL 中)
查看表的统计信息	SHOW TABLE STATUS LIKE '表名';
MySQL 事务相关命令
以下是与 MySQL 事务相关的常用命令：

操作	命令
开始事务	START TRANSACTION; 或 BEGIN;
提交事务	COMMIT;
回滚事务	ROLLBACK;
查看当前事务的状态	SHOW ENGINE INNODB STATUS; (可查看 InnoDB 存储引擎的事务状态)
锁定表以进行事务操作	LOCK TABLES 表名 WRITE; 或 LOCK TABLES 表名 READ;
释放锁定的表	UNLOCK TABLES;
设置事务的隔离级别	SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;


# MySQL与Python连接与使用
> 使用库：pymysql（最主流），Python 操作 MySQL
conn（连接对象）	负责和数据库建立通道；commit 提交；rollback 回滚；关闭连接
cursor（游标对象）	负责执行SQL语句；获取查询结果；关闭游标

```python
import pymysql

try:
    conn = pymysql.connect(
        host='localhost',
        port=3306,
        user='root',
        password='123456',
        database='test_db',
        charset='utf8mb4'
    )
    cursor = conn.cursor()

    # 1.增
    sql_add = "INSERT INTO student(name,age) VALUES (%s,%s)"
    cursor.execute(sql_add, ("小李", 20))

    # 2.改
    sql_update = "UPDATE student SET age=%s WHERE name=%s"
    cursor.execute(sql_update, (22, "小李"))

    # 3.删
    sql_del = "DELETE FROM student WHERE name=%s"
    cursor.execute(sql_del, ("小李",))

    conn.commit()

    # 4.查
    sql_select = "SELECT * FROM student"
    cursor.execute(sql_select)
    data = cursor.fetchall()
    print("查询结果：", data)

except Exception as e:
    conn.rollback()
    print("出错回滚：", e)
finally:
    cursor.close()
    conn.close()
```
{% note warning %}
1. 占位符统一用 %s，数字、字符串都一样
2. 永远用 execute(sql,参数)，禁止 f‑string 拼接 SQL，防止注入
3. 元组只有一个参数时后面必须加逗号：(4,)
{% endnote %}



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
{% note info %}
datetime：原样存时间，不受时区影响、能用几千年
timestamp：存 UTC 秒数、跟着时区变、可以自动更新、2038 年就报废
{% endnote %}
- 年类型  - year（年）格式：yyyy
## 字符串类型
- 字符类型  - char（固定长度）、varchar（可变长度）
- 文本类型  - text（固定长度）、mediumtext（可变长度）、longtext（可变长度）
- 二进制类型  - blob（固定长度）、mediumblob（可变长度）、longblob（可变长度）

# 创建数据库
1. mysql服务，安装完mysql之后，启动mysql服务(在服务中可将其设为自启)
2. 进入命令行，使用命令`mysql -u root -p`进入mysql命令行，输入密码，进入mysql命令行
```bash
mysql -h localhost -u root -p  #连接mysql   localhost：主机名   root:用户名   -p:使用密码登录
```
3. 创建数据库，使用命令`create database 数据库名;
4. 退出mysql命令行
```bash
exit;
```

# mysql用户设置


# 操作数据库
- 创建数据库
```bash
create database if not exists 数据库名 character set utf8mb4 collate utf8mb4_unicode_ci;
# 创建数据库，如果数据库不存在则创建，字符集为utf8mb4，规定能放什么;
# 排序规则为utf8mb4_unicode_ci,查询时不区分大小写
```
- 删除数据库
```bash
drop database if exists 数据库名;
```
- 展示数据库
```bash
show databases;
```
- 切换(使用)数据库，后续sql操作都在该数据库下进行
```bash
use 数据库名;
```
- 展示数据库表
```bash
show tables;
```
- 显示表信息
```bash
describe 表名;
```
- 表的索引信息
```bash
show indexes from 表名;
```



# 操作表
## 创建
语法：
{% note primary %}
create table if not exists 表名（
    字段名（列） 数据类型 约束,
    ...
    字段名 数据类型 约束,
    ...
）
{% endnote %}
实例：
```bash
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
语法：
{% note primary %}
drop table if exists 表名;
{% endnote %}
实例：
```bash
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
语法：
{% note primary %}
insert into 表名（字段名1,字段名2,字段名3）
values（值1,值2,值3）
{% endnote %}
实例：
```bash
INSERT INTO users (username, email, birthdate)
VALUES ('johndoe', 'johndoe@example.com', '1990-01-01');
```
{% note info %}
如果表中没有主键，会自动生成一个主键值
{% endnote %}
如果你要插入所有列的数据，可以省略列名：
```bash
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
语法：
{% note primary %}
select 字段名1,字段名2,字段名3/*（*表示查询所有字段）
from 表名
{% endnote %}
实例：
```bash
SELECT * FROM users;
```
### where 条件查询
语法：
{% note primary %}
select 字段名1,字段名2,字段名3/*（*表示查询所有字段）
from 表名
where 条件
{% endnote %}
实例：
```bash
SELECT * FROM users WHERE is_active = TRUE;
```
{% note info %}
条件可以是任意的 SQL 表达式，例如 `is_active = TRUE`、`birthdate > '1990-01-01'` 等。
可以使用 AND 或者 OR 指定一个或多个条件。
WHERE 子句也可以运用于 SQL 的 DELETE 或者 UPDATE 命令。
{% endnote %}
### order by 排序查询
语法：
{% note primary %}
select 字段名1,字段名2,字段名3/*（*表示查询所有字段）
from 表名
order by 字段名1,字段名2,字段名3
{% endnote %}
实例：
```bash
SELECT * FROM users ORDER BY id;
```
{% note info %}
order by 子句可以指定一个或多个字段进行排序。
可以使用 ASC（升序）或 DESC（降序）指定排序方向。
{% endnote %}
### limit 分页查询
语法：
{% note primary %}
select 字段名1,字段名2,字段名3/*（*表示查询所有字段）
from 表名
limit 偏移量, 行数
{% endnote %}
实例：
```bash
SELECT * FROM users LIMIT 0, 10;
```
{% note info %}
limit 子句可以指定查询的行数和偏移量。
偏移量从 0 开始，行数默认为 10。
{% endnote %}

## 更新数据
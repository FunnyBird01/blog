---
title: "MySQL"
cateagories: 
  - 开发必备
cover: "https://cdn-icons-png.flaticon.com/128/16548/16548967.png"
---
# MySQL
一款用来存储数据的数据库管理系统
使用标准SQL操作数据
涉及信息：
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

# 创建数据库
1.mysql服务，安装完mysql之后，启动mysql服务(在服务中可将其设为自启)
2.进入mysql命令行，使用命令`mysql -u root -p`进入mysql命令行，输入密码，进入mysql命令行
3.创建数据库，使用命令`create database 数据库名;`

# sql操作数据库
1.创建数据库表



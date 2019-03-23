#!/bin/bash

datetime=$(date "+%Y-%m-%d %H:%M:%S")
file="/var/www/html/index.json"

echo "date: $datetime" > monitor.log
echo "user: $USER" >> monitor.log
/sbin/service mysqld status >> monitor.log

/sbin/service mysqld status | grep "run" >> /dev/null


code=$?

if [ $code = "0" ]
then
    status="OK"
else
    status="ERROR"
fi


cat << EOF > $file
{
    "last_task_execution": "$datetime",
    "mysqld_code": "$code",
    "mysql_status": "$status",
    "sys_path": "$PATH"
}
EOF

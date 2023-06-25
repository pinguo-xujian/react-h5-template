FROM mirror.camera360.com/base/yarn:14 as builder
COPY . /app
WORKDIR /app
RUN /bin/sh -c 'yarn && yarn build:auto'

# 运维使用的分割线
#---DoNotDelete

FROM mirror.camera360.com/base/centos7.8:nginx-basic
RUN mkdir -pv /data/wwwlogs/ && mkdir -pv /data/wwwroot/blurrr-h5.camera360.com/dist/ugc-h5/ && mkdir /etc/nginx/vhost
COPY --from=builder /app/dist/ /data/wwwroot/blurrr-h5.camera360.com/ugc-h5/
ADD run.sh /run.sh
RUN chmod +x /run.sh

# Enabling MQTT 5.0 plugin
docker compose exec rabbitmq rabbitmq-plugins enable rabbitmq_mqtt
docker compose exec rabbitmq rabbitmqctl enable_feature_flag all
docker compose exec rabbitmq rabbitmqctl list_feature_flags --formatter=pretty_table

echo "MQTT 5.0 plugin enabled"
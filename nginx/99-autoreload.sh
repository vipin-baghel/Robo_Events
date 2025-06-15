
#!/bin/sh
while :; do
    # Optional: Instead of sleep, detect config changes and only reload if necessary.
    sleep 15d
    nginx -t && nginx -s reload
done &


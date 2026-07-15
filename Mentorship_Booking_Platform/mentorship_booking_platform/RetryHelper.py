from retry import retry

@retry(
    tries=3,
    delay=2
)
def retry_operation(operation):
    return operation()
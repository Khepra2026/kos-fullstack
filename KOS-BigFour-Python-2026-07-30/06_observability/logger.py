# observability hook
import logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')
logger = logging.getLogger("KOS")
logger.info("Observability module loaded")

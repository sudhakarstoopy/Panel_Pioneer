src/backend/bert_model/train.py:
```python
import tensorflow as tf
from transformers import BertTokenizer, TFBertForSequenceClassification

def train_bert_model(train_texts, train_labels):
    # Load pre-trained BERT model and tokenizer
    model = TFBertForSequenceClassification.from_pretrained('bert-base-uncased')
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

    # Tokenize and prepare input data
    train_encodings = tokenizer(train_texts, truncation=True, padding=True)
    train_dataset = tf.data.Dataset.from_tensor_slices((
        dict(train_encodings),
        train_labels
    ))

    # Compile and train the model
    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=3e-5),
                  loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
                  metrics=['accuracy'])
    
    model.fit(train_dataset.shuffle(1000).batch(16), epochs=3, batch_size=16)

    return model

# Example usage
train_texts = ["Sample resume text 1", "Sample resume text 2"]
train_labels = [0, 1]  # Example labels
trained_model = train_bert_model(train_texts, train_labels)
